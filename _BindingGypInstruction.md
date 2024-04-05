# [binding.gyp](./binding.gyp) 파일을 설명한 것(helpled by GPT4.0)

이 파일은 package.json의 scripts 내의 "install": "node-gyp-build", 명령어를 실행하면 실행되는 파일이다. 이곳에 오류가 없어야 yarn install or npm run start 할 때에 에러가 안 난다.

## 문법(?)

"" 스트링 안에 <(변수) 이렇게 되어있는 것들이 있다. 이 안에는 우리가 별도로 지정한 변수가 들어간다.

## 프로퍼티즈

### variables

-   variables: 빌드 프로세스에서 사용할 변수를 정의합니다. 예를 들어, edsdk_version은 Canon EDSDK 버전을 나타내며, edsdk_directory는 EDSDK의 디렉토리 경로를 저장하는 데 사용됩니다. openssl_fips와 같은 다른 변수들도 빌드에 필요한 추가적인 설정을 위해 정의될 수 있습니다.
    -   edsdk_version: 우리가 사용할 edsdk의 버전. third_party/에 EDSDKvxxxxxW 의 xxxxx를 적으면 된다. 나중에도 다룰 것이지만
    -   edsdk_directory%: 나중에 edsdk_directory 변수를 선언해주는데 이건 왜 적은 건지 모르겠음. 시간으로 테스트는 못해보았다. 의미는 edsdk 라이브러리가 있는 경로
        -openssl_fips : 이 모드는 특히 보안이 중요한 환경에서 요구되며, 암호화 모듈이 정부의 엄격한 보안 표준을 준수하도록 보장합니다.

### defines

-   defines: 컴파일 시점에 정의될 매크로를 지정합니다. 여기서 NAPI_VERSION=<(napi_build_version)는 N-API 버전을 설정하는 데 사용됩니다. 이는 Node.js의 네이티브 애드온 인터페이스 버전을 명시하는 데 중요합니다. napi_build_version이 명시적으로 지정되지 않은 경우, 사용 중인 빌드 도구나 환경(예: node-gyp 또는 cmake-js)이 기본값을 사용할 수 있습니다.

### targets

빌드할 대상의 목록입니다. 각 대상은 특정 출력 파일(예: .node 바이너리)을 생성하기 위한 설정을 포함합니다

-   target_name: 빌드 대상의 이름을 지정합니다.
-   cflags!와 cflags_cc!: C와 C++ 컴파일러에 전달할 플래그를 정의합니다 -fno-exceptions는 C++ 예외 처리를 비활성화합니다.
-   defines: 대상별로 정의할 매크로를 지정합니다. 여기서는 NAPI_CPP_EXCEPTIONS를 사용하여 N-API의 C++ 예외 처리를 활성화할 수 있습니다.
-   sources: 대상을 빌드할 때 컴파일해야 할 소스 파일의 목록입니다.
-   include_dirs: 컴파일러에게 헤더 파일 검색 경로를 지정합니다.

    -   "./src": 현재 프로젝트의 src 디렉토리를 나타냅니다. 이는 일반적으로 프로젝트 내에서 직접 작성한 C++ 헤더 파일들이 위치하는 곳입니다.
    -   "<!(node -p \"require('node-addon-api').include_dir\")": 이것은 더 복잡한 표현으로, Node.js의 node-addon-api 패키지가 제공하는 헤더 파일의 위치를 동적으로 결정하는 데 사용됩니다. 구체적으로는 다음과 같은 과정을 거칩니다:
        -   node -p 명령어는 Node.js 프로세스를 실행하여 단일 표현식을 평가하고 그 결과를 출력합니다.
        -   \"require('node-addon-api').include_dir\" 표현식은 node-addon-api 모듈의 include_dir 속성을 요청합니다. 이 속성은 node-addon-api 헤더 파일들이 위치한 디렉토리의 경로를 나타냅니다.
        -   <!(...) 구문은 GYP의 실행 시 평가(exec-time evaluation) 연산자로, 포함된 명령어를 실행하고 그 결과를 GYP 구성에 삽입합니다. 여기서는 node-addon-api의 헤더 파일 디렉토리를 include_dirs 목록에 추가합니다.

-   conditions: 특정 조건(예: 운영 체제)에 따라 적용할 설정을 정의합니다. - OS==\"win\"와 같은 조건 하에 **msvs_settings**와 libraries, copies 등의 설정을 할 수 있습니다. 이는 Windows 환경에서의 컴파일러 설정, 링크할 라이브러리, 빌드 후 복사할 파일 등을 지정합니다. - OS==\"mac\"에 대한 설정은 macOS 환경에서의 빌드 옵션을 정의합니다.
    > 여기서 /third_party에 있는 EDSDK 모듈을 라이브러리로 지정하고 include_dirs한다. **여기에서 .dll 라이브러리의 경로를 지정한다. 이로서 c++ 파일에서 napi와 EDSDK.dll의 기능을 라이브러리로 사용가능한 것이다.(include_dirs, libraries)**

#### c++에서 napi와 EDSDK.dll의 기능을 어떻게 사용하는 지 알고 싶다면 [이 문서](./_NapiInstruction.md) 참고
