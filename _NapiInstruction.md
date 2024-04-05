# Napi(Node-Addon-Api) 설명

~.dll파일의 api를, 어떻게 c++을 거쳐 node js에서 호출하는 지에 대해 스터디한 것을 정리한 마크다운

## 목차

-   [요구 개발환경](#요구-개발환경)
-   [주요 디렉토리](#주요-디렉토리)
-   [Napi란?](#napi)
-   [napi 구현 설명](#napi-구현-설명)
    -   [.h 파일](#h-파일)
        -   [uility.h](#utilityh)
        -   [event.h](#eventh)
    -   [.cc 파일](#cc-파일)
        -   [init()](#init-함수)
        -   [register-add-on](#camera-apicc)
    -   [.JS 파일](#js-파일)
        -   [클래스](#클래스)
        -   [함수](#함수)
        -   [멤버변수](#멤버변수)
        -   [enum](#enum)
        -   [exporting](#camera-apitsexporting)

## 요구 개발환경

-   python : binding.gyp 파일을 돌리려면 python 이 필요하다. 다만 3.12부터는 이전 버전까지 기본으로 제공되는 util 라이브러리가 빠지게 되면서 3.12 이전 버전으로 설치해야한다.
-   c++ ^17 : c++ 코드를 사용해야하는 것이니깐 당연히 c++을 설치해야한다.

## 주요 디렉토리

-   /third_party/ : 호출하려는 .dll 파일이 있는 디렉토리. ([binding.gyp](./_BindingGypInstruction.md)에서 지정해야한다.)
-   /src/ :
    -   library: c++ 파일들이 있는 디렉토리
    -   stubs: library/에 있는 c++ 로직을 매핑하는 javascript(typescript) 모듈을 작성하는 곳

## Napi?

-   node-addon-api인데 이걸 npm으로 설치하면 javascript뿐만 아니라 c++로 작성된 라이브러리도 node_modules에 설치된다. 그리고 src/library에서 napi의 c++ 클래스 및 함수를 가져와 사용하는 것이다.
-   c++ 코드에서 Napi 라는 라이브러리를 사용하여 c++ 클래스를 javascript class를 만들고 c++ 함수를 javascript 함수로 등록한다. 더 나아가 Napi를 이용하여 javascript의 콜백 함수를 실행하는 등 c++과 javascript 간의 인터페이스 역할을 한다.

> 자 그럼 이제 .h(c++ 헤더파일), .cc(c++ 파일), .ts 각 파일들을 살펴보면서 이 문서의 목표 수행을 위한 주요 함수들과 파일들을 살펴보도록 하자.

## napi 구현 설명

.h 파일, .cc 파일, .ts 에서 **[.dll <-> c++ <-> node]** 구현을 위한 주요 파일과 주요 함수를 살펴보도록 하겠다.

### .h 파일

c/c++에서의 헤더파일이다. 주로 여기서 타입들을 선언해놓고 .cc 파일에서 구현한다. 주요 코드와 파일을 살펴보자

```c++
#include <napi.h>
...
public:
    ...
    static Napi::Object NewInstance(Napi::Env env);

    static Napi::Object Init(Napi::Env env, Napi::Object exports);

private:
    static constexpr const char JSClassName[] = "CameraBrowser";

    static inline Napi::Function JSConstructor(Napi::Function *func = nullptr) {
        static Napi::FunctionReference constructor;

        if (func != nullptr) {
            constructor = Napi::Persistent(*func);
            constructor.SuppressDestruct();
        }
        return constructor.Value();
    }

    Napi::Value ToStringTag(const Napi::CallbackInfo &info);
```

-   #include <napi.h> 를 꼭 불러와야 Napi의 기능들을 사용할 수 있다.
-   .cc 파일이 이를 구현하는 부분에서 더 자세히 살펴보긴 하겠지만, 상수 JSClassName는 node에서 사용할 수 있는 class 이름이 된다.
-   Napi::Value 로 선언한 함수들은 node js 에서 호출할 수 있는 해당 클래스의 함수가 된다. 이에 대한 구현 또한 .cc 파일에서 한다.
-   Init() 함수는 바로 위에서 설명한 내용들을 실행하는 함수이다. [camera-api](./src/library/camera-api.cc)에서 각 c++ 클래스의 Init()를 호출한다. 그렇게 node js에서 불러와 실행할 수 있는 javascript 라이브러리로 export 하여 node에서 사용할 수 있게 된다.

#### [utility.h](./src/library/utility.h)

dll 라이브러리를 include 하여 사용하는 것과 연관이 있음

```c++
#include <EDSDKTypes.h>
```

-   EDSDK의 함수나 타입을 사용하기 위해서는 EDSDKTypes.h 불러와야한다. utility.h 에서는 EDSDK의 타입을 사용하고 있고 여러 파일에서 사용하는 공통 함수가 들어있다. 그래서 utility.h를 include 하면 공통함수 뿐만 아니라 EDSDK의 함수나 타입을 사용할 수 있게 된다. 그렇기 때문에 거의 대부분의 파일에서 이 파일을 가져다 쓰고 있다.
-   **그러니 제공된 .dll 라이브러리가 있다면 반드시 해당 이렇게 include 하도록 하자**

#### [event.h](./src/library/events.h)

이벤트 이름들을 나열한 파일(node js eventHandler, class enum과 연관이 있음\)

```c++
auto jsCallback = [eventName](
    Napi::Env env, Napi::Function jsCallback, DeviceEventData *dataPtr
) {
    Napi::Object event = Napi::Object::New(env);
    event.Set("camera", CameraWrap::NewInstance(env, dataPtr->camera));
    jsCallback.Call(
        {
            Napi::String::New(env, eventName),
            event
        }
    );
    delete dataPtr;
};
```

-   위 코드 블럭은 node js에서 특정 이벤트에 **등록된 콜백 함수를 실행**시키는 c++ 내의 코드이다. 아래의 코드 블럭을 보면서 실제 사례를 보자

```c++
// events.h
...
const char EventName_LiveViewStart[] = "LiveViewStart";
const char EventName_LiveViewStop[] = "LiveViewStop";
...
```

-   events.h에서 등록된 변수를 이용하여 이벤트를 발생시키고 있다.

```c++
// camera.cc
auto jsCallback = [](
    Napi::Env env, Napi::Function jsCallback, LiveViewEventData *dataPtr
) {
    Napi::Object event = Napi::Object::New(env);
    event.Set("camera", CameraWrap::NewInstance(env, dataPtr->camera));
    // js 콜백을 실행하는 함수
    jsCallback.Call(
        {
            // 두번째 인자로 이벤트 이름
            Napi::String::New(
                env,
                dataPtr->isActive ? EventName_LiveViewStart : EventName_LiveViewStop
            ),
            event
        }
    );
    delete dataPtr;
};
```

-   위의 jsCallback()가 실행되는 시점에 아래에 등록된 콜백함수가 실행된다.

```typescript
events.on(CameraBrowser.EventName.LiveViewStart, (event: any) => {
    console.log("LV Started", event);
});
events.on(CameraBrowser.EventName.LiveViewStop, (event: any) => {
    console.log("LV Stopped", event);
});
```

그런데 events.h를 보면 선언한 string 변수를 아래처럼 배열로 묶어두었다. 이건 왜 이랬을까?

```c++
const std::vector CameraBrowserEvents = {
    EventName_CameraAdd,
    EventName_CameraRemove,
    EventName_CameraConnect,
    EventName_CameraDisconnect,
    EventName_StateChange,
    EventName_KeepAlive,
    EventName_LiveViewStart,
    EventName_LiveViewStop,
    EventName_PropertyChangeOptions,
    EventName_PropertyChangeValue,
    EventName_DownloadRequest,
    EventName_FileCreate,
    EventName_DirectoryCreate,
    EventName_VolumeChange,
    EventName_ObjectChange,
    EventName_Error
};
```

또 다시 등장한 Init() 함수. 이 함수가 호출 될 때에 해당 클래스에서 사용할 수 있는 이벤트명을 enum처럼 지정한다. 아래가 그 코드다.

```c++
Napi::Object CameraBrowserWrap::Init(Napi::Env env, Napi::Object exports) {
    ...
    Napi::Object eventNames = Napi::Object::New(env);
    for (auto it: CameraBrowserEvents) {
        eventNames.Set(it, it);
    }
    StaticValue("EventName", eventNames, napi_enumerable)
    ...
}
```

그러면 node js에서 사용할 때에 아래에 보이는 바와 같이 enum 처럼 사용할 수 있다.

```typescript
events.on(CameraBrowser.EventName.LiveViewStart, (event: any) => {
    console.log("LV Started", event);
});
events.on(CameraBrowser.EventName.LiveViewStop, (event: any) => {
    console.log("LV Stopped", event);
});
```

### .cc 파일

-   위에서 설명한 .h 파일과 같은 이름으로 쓴다. 예\) camera.c, camera.cc
-   같은 이름의 헤더파일에서 선언한 함수나 변수들을 여기서 구현한다.
-   dll api 라이브러리를 include 한다면 타입과 함수를 사용 가능하다.
-   EdsCameraListRef, EdsError, EdsUInt32 등 .dll의 타입과 EdsGetCameraList과 EdsRelease과 같은 함수는 프로그램과 함께 준 문서를 확인하자

> 이제 주요코드와 파일을 살펴보도록 하자.

#### Init 함수

```c++
Napi::Object CameraBrowserWrap::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Object eventNames = Napi::Object::New(env);
    for (auto it: CameraBrowserEvents) {
        eventNames.Set(it, it);
    }

    Napi::Function func = DefineClass(
        env,
        CameraBrowserWrap::JSClassName,
        {
            InstanceAccessor<&CameraWrap::GetDescription>("description"),
            InstanceAccessor<&CameraWrap::GetPortName>("portName"),

            InstanceMethod("initialize", &CameraBrowserWrap::Initialize),
            InstanceMethod("terminate", &CameraBrowserWrap::Terminate),
            InstanceMethod("triggerEvents", &CameraBrowserWrap::TriggerEvents),
            InstanceMethod("getCamera", &CameraBrowserWrap::GetCamera),
            InstanceMethod("getCameras", &CameraBrowserWrap::GetCameras),
            InstanceMethod("update", &CameraBrowserWrap::Update),
            InstanceMethod("setEventHandler", &CameraBrowserWrap::SetEventHandler),

            InstanceAccessor<&CameraBrowserWrap::ToStringTag>(Napi::Symbol::WellKnown(env, "toStringTag")),
            InstanceMethod(GetPublicSymbol(env, "nodejs.util.inspect.custom"), &CameraBrowserWrap::Inspect),

            StaticValue("EventName", eventNames, napi_enumerable)
        }
    );
    JSConstructor(&func);

    exports.Set(CameraBrowserWrap::JSClassName, func);
    exports.Set("cameraBrowser", CameraBrowserWrap::NewInstance(env));
    return exports;
}
```

-   Napi::HandleScope scope(env):: 이거를 해야 가비지 컬렉션이 작동되어 메모리가 효율적으로 관리된다.
-   DefineClass: 함수의 이름 그대로 javascript class 를 만드는 기능을 한다. 이후 이것을 JSConstructor함수에 인자로 주어 실행한다.
-   Init()의 두번째 인자로 받은 exports에 값들을 세팅하고 이 exports를 반환한다.
-   DefineClass를 보면 멤버를 등록할 때에 InstanceMethod, InstanceAccessor, StaticValue 이 세개의 Napi 함수를 통해 변수, 함수, enum을 등록한다.

    -   **InstanceAccessor(&실행할 c++ 함수, js 변수명)**: 쉽게 말해 Getter이다.
        이것을 javascript stub에서는 이렇게 쓴다.
        ```typescript
        /**
         * @readonly
         */
        get description(): string {
            throw new Error('Not implemented - stub only.');
        }
        ```
        이를 node에서 사용할 때에는 아래와 같다.
        ```typescript
        const description = camera.description;
        ```
    -   **InstanceMethod('프로퍼티명', &실행할 함수)**: 클래스의 함수를 등록하는 기능을 한다. 이것을 javascript stub에서는 이렇게 쓴다.

        ```typescript
            getCamera(at: string | number = 0, exactOnly = false): Camera {
                throw new Error('Not implemented - stub only.');
            }
        ```

        이를 node에서 사용할 때에는 아래와 같다.

        ```typescript
        const camera = cameraBrowser.getCamera();
        ```

    -   **StaticValue(변수명, Napi::Object로 된 이벤트명 나열 한 것, napi_enumerable)**: [위에서](#eventh)설명했던, 클래스의 enum을 등록하는 기능을 한다.

#### [camera-api.cc](./src/library/camera-api.cc)

많이 등장했던 Init() 함수가 여기에서 실행된다.
이를 기반으로 add-on이 등록된다.

```c++
Napi::Object RegisterModule(Napi::Env env, Napi::Object exports) {
    ...
    Napi::HandleScope scope(env);
    CameraBrowserWrap::Init(env, exports);
    CameraWrap::Init(env, exports);
    ...
    return exports;
}

NODE_API_MODULE(
    NODE_GYP_MODULE_NAME, RegisterModule
)
```

NODE_API_MODULE api는 아래와 같다.
<br/>
**"Register an add-on based on an initializer function."**
<br/>
설명하기를, NODE_API_MODULE를 실행함으로서 시작 함수를 기반으로 add-on이 등록된다고 한다.

```c++
// Register an add-on based on an initializer function.
#define NODE_API_MODULE(modname, regfunc)                                      \
  static napi_value __napi_##regfunc(napi_env env, napi_value exports) {       \
    return Napi::RegisterModule(env, exports, regfunc);                        \
  }                                                                            \
  NAPI_MODULE(modname, __napi_##regfunc)
```

> NODE_API_MODULE가 c++ add-on이 node로 가는 최종 출구라고 생각된다.

### .JS 파일

/src/stubs/camera-api/내에 있는 클래스들은 c++ 클래스의 Init()이 호출될 때 DefineClass 함수에서 **등록된** 프로퍼티즈를 나열한다. 여기서 새로운 함수를 정의하지 않는 이상 그게 다이다.

#### 클래스

-   클래스명 등록: [Symbol.toStringTag] = 'Camera';

```typescript
export class Camera {
    [Symbol.toStringTag] = "Camera";

    /**
     * Camera device
     * @class Camera
     * @param {number|string} [indexOrPort=0]
     */
    constructor(indexOrPort: number | string = 0) {
        throw new Error("Not implemented - stub only.");
    }
}
```

#### 함수

위 코드 블럭의 생성자도 그렇고 아래 코드블럭도 그렇고, node-addon을 통해 node js에서 호출되는 함수에 인자가 있다. 하지만 이 인자들이 js 코드에서 사용되지 않고 어떤 기능을 하는 변수인지만 변수명으로 명시되어있다.<br/>

**다음 코드 블럭을 보자**

```typescript
/**
 * @param {number} command
 * @param {number} parameter
 */
sendCommand(command: number, parameter: number = 0): void {
    throw new Error('Not implemented - stub only.');
}
```

아래 코드블럭은 js 함수인 sendCommand를 호출했을 때 호출되는 c++의 SendCommand 함수이다.<br/>
인자로 (const Napi::CallbackInfo &info)를 받고 있다.<br/>
수상해보이는(js 함수의 인자로 보이는 녀석들이) 있다. 바로 info[0], info[1]이다. javascript에서 던진 인자는 c++ 함수에서 그 순서대로 info[1, 2, ...]인 것이다.<br/>
하지만 javascript 에서의 타입에 따라서 info[n].IsNumber(), .IsFunction() 등의 타입 가드를 해주고, 이를 사용할 때에는 info[0].As<Napi::Number>(), info[0].As<Napi::Function>() 등의 처리를 꼭 해주자.

```c++
Napi::Value CameraWrap::SendCommand(const Napi::CallbackInfo &info) {
    if (info.Length() < 1 || !info[0].IsNumber()) {
        throw Napi::TypeError::New(
            info.Env(), "Argument 0 must be an command identifier."
        );
    }
    return ApiError::ThrowIfFailed(
        info.Env(),
        camera_->sendCommand(
            info[0].As<Napi::Number>().Int32Value(),
            (info.Length() > 1) ? info[1].As<Napi::Number>().Int32Value() : 0
        )
    );
}
```

#### 멤버변수

```typescript
/**
 * @readonly
 */
get description(): string {
    throw new Error('Not implemented - stub only.');
}
```

이를 node에서 사용할 때에는 아래와 같다.

```typescript
const description = camera.description;
```

#### enum

.cc 파일에서 StaticValue로 export 한 프로퍼티를 그 항목대로 나열한 것이다. [참고](#utilityh) string 값이라면 단순히 이렇게 하면된다.

```typescript
// Generate: CameraBrowser

/**
 * @readonly
 * @enum {string}
 */
static readonly EventName: { [key: string]: string } = {
    CameraAdd: 'CameraAdd',
    CameraConnect: 'CameraConnect',
    CameraDisconnect: 'CameraDisconnect',
    CameraRemove: 'CameraRemove',
    DirectoryCreate: 'DirectoryCreate',
    DownloadRequest: 'DownloadRequest',
    Error: 'Error',
    FileCreate: 'FileCreate',
    KeepAlive: 'KeepAlive',
    LiveViewStart: 'LiveViewStart',
    LiveViewStop: 'LiveViewStop',
    ObjectChange: 'ObjectChange',
    PropertyChangeOptions: 'PropertyChangeOptions',
    PropertyChangeValue: 'PropertyChangeValue',
    StateChange: 'StateChange',
    VolumeChange: 'VolumeChange',
};

// GenerateEnd
```

하지만 제공된 dll의 헤더 파일을 보면 #define이나 enum의 값이 아래처럼 16진수의 값이 지정 되어있는 것들이 있다.

```c++
// EDSDKTypes.h
typedef  EdsUInt32  EdsCameraCommand;
/*----------------------------------
 Send Commands
----------------------------------*/
#define kEdsCameraCommand_TakePicture                     0x00000000
...
typedef enum
{
	kEdsCameraCommand_ShutterButton_OFF					= 0x00000000,
...
} EdsShutterButton ;
...
```

이를 c++에서는 { dll에서 제공한 헤더 파일의 define 혹은 enum, js 에서 쓰일 enum key } 로 하여 return 한다.

```c++
const LabelMap &CameraCommands() {
    static const LabelMap map = {
        {kEdsCameraCommand_TakePicture, "TakePicture"},
        ,,,
    };
    return map;
}

const LabelMap &CameraParametersShutterButton() {
    static const LabelMap map = {
        {kEdsCameraCommand_ShutterButton_OFF, "OFF"},
        ...
    };
    return map;
}
```

이후는 여러분이 [위에서](#utilityh) 본 것과 같다.

```c++
// camera.cc 맨 밑
void CameraWrap::Init(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);

    Napi::Object Commands = Napi::Object::New(env);
    for (const auto &it: CameraCommands()) {
        Commands.Set(
            Napi::String::New(env, it.second), Napi::Number::New(env, it.first)
        );
    }
    ...
    Napi::Function func = DefineClass(
            env,
            CameraWrap::JSClassName,
            {
                ...
                StaticValue("Command", Commands, napi_enumerable),
                ...
            }
    )
    ...
}
```

그리고 js에서 export 할 때에는 enum 키의 값을, dll에서 제공한 헤더 파일 #define과 enum의 값을 16진수에서 10진수로 변환하여 지정해주면 된다.

```typescript
/**
 * @readonly
 * @enum {number}
 */
static readonly Command: { [key: string]: number } = {
    ...
    TakePicture: 0,
};
```

#### camera-api.ts(exporting)

마지막 단계이다.<br/>
이제 javascript에서도 add-on에 맞는 속성들을 선언하였으니 이것들을 node js에서 라이브러리로 사용할 수 있게 export 해야한다.<br />
이 프로젝트에서는 [camera-api.ts](./src/stubs/camera-api/CameraApi.ts)에서 뿌려주고 있다. <br />
이후 [public_api.ts](./src/stubs/public_api.ts)를 거치고 [index.ts](./src/stubs/index.ts)를 거치고 yarn package 명령어를 통해 /stubs/ 디렉토리가 생성되고, node_package가 생성되어 다른 node 프로젝트에서 쓰일 수 있는, c++을 통해 .dll api를 호출할 수 있는 node_module이 탄생하게 되는 것이다.
yarn package와 같이 명령어들에 대한 설명은 [이 문서](./_PackageJsonInstruction.md) 참고하길 바란다.
