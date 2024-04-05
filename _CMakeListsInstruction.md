# [CMakeLists.txt](<(./CMakeLists.txt)>) 설명 (helped by Chat GPT4.0)

## CMakeLists.txt란?

> CMake 프로젝트 설정 파일입니다. CMake는 크로스 플랫폼 빌드 시스템으로, 소프트웨어의 빌드 과정을 관리하고 자동화합니다. 이 파일은 프로젝트를 구성하고, 빌드하기 위한 다양한 지시사항을 포함합니다.

## CMakeLists.txt 파일의 주요 구성 요소

### 기본 설정:

-   <b>cmake_minimum_required(VERSION 3.9):</b> CMake의 최소 요구 버전을 지정합니다.
-   <b>cmake_policy(SET CMP0042 NEW):</b> 특정 CMake 정책을 설정합니다. CMP0042는 macOS에서 rpath 사용과 관련된 정책입니다.
-   <b>set (CMAKE_CXX_STANDARD 17):</b> C++17 표준을 사용하도록 설정합니다.

### 프로젝트 설정:

-   <b>project(napi-canon-cameras):</b> 프로젝트 이름을 napi-canon-cameras로 지정합니다.

### 디렉토리 및 파일 포함:

-   <b>include_directories(...):</b> 컴파일러에게 헤더 파일이 있는 디렉토리를 알려줍니다.
-   <b>file(GLOB SOURCE_FILES ...):</b> 소스 파일을 SOURCE_FILES 변수에 자동으로 할당합니다.

### 라이브러리 생성:

-   <b>add_library(...):</b> 소스 파일을 사용하여 공유 라이브러리를 생성합니다. 이 라이브러리는 .node 확장자를 가지며, Node.js 네이티브 애드온으로 사용됩니다.

### N-API 및 Node.js 설정:

-   <b>target_link_libraries(...):</b> 생성된 라이브러리가 다른 라이브러리(예: CMAKE_JS_LIB, EDSDK.lib)와 링크되도록 설정합니다.
-   <b>execute_process(...):</b> Node.js의 node-addon-api 경로를 찾기 위해 Node.js 명령을 실행합니다.
-   <b>add_definitions(-DNAPI_EXPERIMENTAL):</b> NAPI_EXPERIMENTAL을 정의함으로써 실험적인 N-API 기능을 사용할 수 있도록 합니다.

## 변수들

```
${CMAKE_JS_INC},
${CMAKE_JS_SRC},
${CMAKE_JS_LIB},
${CMAKE_SOURCE_DIR},
${CMAKE_GENERATOR},
${CMAKE_CURRENT_SOURCE_DIR}
```

> 얘넨 뭐람. 어디서 온 것일까?

### CMake 내장 변수

-   <b>${CMAKE_SOURCE_DIR}:</b> 프로젝트의 최상위 소스 디렉토리를 가리킵니다. 즉, 최상위 CMakeLists.txt 파일이 위치한 디렉토리의 경로입니다.
-   <b>${CMAKE_CURRENT_SOURCE_DIR}:</b> 현재 처리 중인 CMakeLists.txt 파일이 위치한 디렉토리의 경로입니다. 하위 디렉토리에 있는 CMakeLists.txt 파일에서 이 변수를 사용하면, 그 파일이 위치한 디렉토리 경로를 얻을 수 있습니다.
-   <b>${CMAKE_GENERATOR}:</b> CMake 프로젝트를 구성할 때 사용된 제너레이터의 이름입니다. 예를 들어, "Unix Makefiles", "Visual Studio 16 2019" 등이 있습니다. 이는 CMake를 실행할 때 선택되거나 기본값에 의해 결정됩니다.

### cmake-js에서 설정되는 변수

> cmake-js를 사용할 때, 다음 변수들은 cmake-js에 의해 자동으로 설정되고 관리됩니다. 이 변수들은 Node.js 네이티브 애드온 빌드 시 필요한 특정 경로나 설정을 나타냅니다.

-   <b>${CMAKE_JS_INC}:</b> Node.js와 Node 애드온 API에 대한 헤더 파일이 포함된 디렉토리의 경로입니다. cmake-js가 Node.js 네이티브 애드온을 빌드할 때 필요한 Node.js 관련 헤더 파일을 찾기 위해 사용됩니다.
-   <b>${CMAKE_JS_SRC}:</b> cmake-js 관련 소스 파일 경로를 가리킵니다. 일반적으로 사용자가 직접 수정할 필요는 없습니다.
-   <b>${CMAKE_JS_LIB}:</b> cmake-js 빌드 과정에서 링크해야 하는 Node.js 라이브러리 파일들의 경로를 나타냅니다. 예를 들어, Node.js의 V8 엔진과 관련된 라이브러리를 링크할 때 사용됩니다.

```
이 변수들은 cmake-js가 실행될 때 자동으로 환경에 맞게 설정되므로, 사용자가 별도로 설정할 필요는 없습니다. cmake-js 명령을 실행하면, 이 도구는 Node.js 환경을 자동으로 감지하여 이러한 변수들을 적절히 설정하고, CMake 빌드 시스템에 전달합니다.
```

## 이거는 언제 사용되나?

> package.json 보면 scripts에 "\_exp:build:cmake": "cmake-js -O cmake-build rebuild" 명령어가 있다.

# cmake-js

## cmake-js란?

> cmake-js는 Node.js 네이티브 애드온 개발을 위한 CMake 기반의 빌드 시스템입니다. node-gyp의 대안으로 사용되며, CMake를 사용하여 네이티브 애드온을 더 유연하게 빌드할 수 있도록 해줍니다. Node.js 개발자들이 C++ 코드를 쉽게 컴파일하고 Node.js 애플리케이션과 통합할 수 있게 도와줍니다.
