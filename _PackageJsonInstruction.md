# [package.json](./package.json)의 scripts들에 대한 설명

## 기본 스크립트

-   install: 프로젝트 설치 시 node-gyp-build를 실행합니다. 이는 주로 C++로 작성된 네이티브 모듈을 빌드하는 데 사용됩니다.
-   package: 프로젝트를 패키징하기 전에 필요한 빌드 작업을 실행합니다. 여기서는 prebuild 스크립트를 실행한 후, /helpers/create-tgz.js 스크립트로 패키지 파일을 생성합니다. @dimentional/napi-canon-api/를 여기서 만듬. 추후 이걸 다른 프로젝트에서 사용함.
-   clean: 빌드 과정에서 생성된 파일을 정리합니다. node-gyp clean으로 네이티브 모듈의 빌드 결과물을 삭제하고, rimraf를 사용하여 prebuilds 디렉토리 및 스텁 파일을 삭제합니다.
-   test: 테스트를 실행합니다. 현재는 테스트가 지정되지 않았음을 나타내는 메시지를 출력하고 종료합니다.
-   lint: ESLint를 실행하여 프로젝트의 코드 스타일 및 문제점을 검사합니다.

## 빌드 및 프리빌드 스크립트

-   prebuild: 플랫폼별 빌드 작업을 실행합니다. run-script-os는 현재 실행 중인 시스템의 운영 체제를 자동으로 감지하고, 그에 맞는 스크립트를 실행합니다. 예를 들어, Windows에서는 prebuild:win32 스크립트를, macOS에서는 prebuild:darwin 스크립트를 실행할 수 있습니다.
-   prebuild:win32, prebuild:darwin: Windows 및 macOS 플랫폼에 대한 빌드 사전 준비 작업을 실행합니다. 이는 각 플랫폼의 아키텍처(x64, ia32)에 맞춰 prebuildify를 사용하여 네이티브 모듈을 미리 빌드합니다.
-   prebuild:x64, prebuild:ia32: 각각 x64 및 ia32 아키텍처를 위한 네이티브 모듈을 빌드합니다.
-   build:stubs: 여러 단계를 거쳐 TypeScript 스텁 파일을 빌드합니다.

## 스텁 및 문서 생성 스크립트

-   \_build:stubs:types, \_build:es2015, \_build:esm, \_build:umd, \_build:umd:min: TypeScript로 작성된 스텁(Stub) 파일을 다양한 자바스크립트 모듈 포맷으로 컴파일합니다.
-   build:docs: jsdoc2md를 사용하여 소스 코드 주석에서 마크다운 형식의 API 문서를 생성합니다.

## 유틸리티 스크립트

-   \_clean:stubs, \_update:stubs: 스텁 파일을 업데이트하고 관련 파일을 정리하는 데 사용됩니다.
-   \_exp:build:cmake: cmake-js를 사용하여 CMake 기반의 프로젝트를 빌드합니다. -O cmake-build는 빌드 출력 디렉토리를 지정합니다.

## 기타

### 주의사항

-   프로젝트를 받고, 처음에 yarn이나 npm install로 설치하려고 하면 "node-gyp-build"로 지정해 놓은 "install" script 때문에 에러가 날 수도 있다. 에러가 나는 이유는 node-gyp-build를 실행하면 프로젝트 root 레벨의 binding.gyp 파일을 찾아서 그 안의 명령어를 실행하기 때문이다.

    -   npm 모듈 설치 시 에러가 발생 시 조치 방법:

    1. "install": "node-gyp-build" 이 스크립트를 지우고 설치하기
    2. 싫다면? 에러 로그를 잘 확인해야 한다.
        1. binding.gyp 파일이 존재하는지 확인하기
        2. binding.gyp 파일 내 코드에 오류가 없는지 확인하기<br/>
           예) targets.sources에 여러 파일들이 적혀있는데 그 파일들이 존재하지 않거나 경로가 잘못되어 있는 경우

-   prebuild 시 Napi::Value::operator[] 어쩌구 이러면서 인자 수가 맞지 않다는 에러가 발생할 수 있다. 그럴때는 당황하지 말고 node-addon-api 버전을 5.0.0으로 낮춰보자.

```bash
yarn add node-addon-api@5.0.0 --dev
```

-   package 작업 중 eslint 에러 발생 시에도 에러가 날 수 있다. 그럴 때에는 .eslint.js 가서 해당 eslint rule을 'off'로 해준다.

```javascript
{
    ...
    rules: {
        ...
        indent: "off",
        "@typescript-eslint/no-explicit-any": "off",
        ...
    }
    ...
}
```

### 스텁파일?

> TypeScript 스텁 파일은 TypeScript의 타입 정보를 포함하지만, 실제 구현 로직은 없는 파일을 말합니다. 사용하는 이유는 아래와 같다.

1. 타입 체킹과 자동완성 지원: 스텁 파일은 TypeScript 컴파일러에게 특정 모듈, 라이브러리, 또는 API의 타입 정보를 제공합니다. 이를 통해 개발자는 해당 모듈을 사용할 때 타입 체킹과 자동완성 기능의 이점을 누릴 수 있습니다. 예를 들어, JavaScript로 작성된 외부 라이브러리를 TypeScript 프로젝트에서 사용할 때, 스텁 파일을 통해 해당 라이브러리의 함수나 객체들에 대한 타입 정보를 TypeScript 컴파일러에 제공할 수 있습니다.

2. API 문서 생성: 타입 정보가 포함된 스텁 파일은 API 문서 자동 생성 도구를 통해 사용될 수 있습니다. 이러한 도구들은 스텁 파일에서 타입 정보와 주석을 읽어, 개발자가 참조할 수 있는 문서를 생성합니다.

스텁 파일은 실제 런타임 동작에 영향을 주지 않으며, 주로 개발 과정에서 타입 시스템의 이점을 활용하기 위해 사용됩니다. 예를 들어, .d.ts 확장자를 가진 TypeScript 선언 파일(Declaration File)은 TypeScript의 스텁 파일로 볼 수 있습니다. 이 파일들은 모듈의 API에 대한 타입 선언만을 포함하며, 실제 구현 코드는 포함하지 않습니다.
