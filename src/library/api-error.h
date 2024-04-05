#ifndef NAPI_CANON_API_ERROR_H
#define NAPI_CANON_API_ERROR_H

#include "types.h"
#include "api-identifier.h"
#include <unordered_map>

namespace CameraApi {

    class ApiError : public Napi::ObjectWrap<ApiError>, public ApiIdentifier {
        public:
            explicit ApiError(const Napi::CallbackInfo &info);

            static void Init(Napi::Env env, Napi::Object exports);

            static Napi::Object NewInstance(Napi::Env env, EdsError errorCode);

            static Napi::Value ThrowIfFailed(Napi::Env env, EdsError errorCode);

            static Napi::Value ThrowIfFailed(Napi::Env env, EdsError errorCode, Napi::Value defaultValue);

            static Napi::Value Throw(Napi::Env env, EdsError errorCode);

        private:
            static constexpr const char JSClassName[] = "ApiError";

            static inline Napi::Function JSConstructor(Napi::Function *func = nullptr) {
                static Napi::FunctionReference constructor;

                if (func != nullptr) {
                    constructor = Napi::Persistent(*func);
                    constructor.SuppressDestruct();
                }
                return constructor.Value();
            }

            static Napi::Error FromErrorCode(Napi::Env env, EdsError errorCode);
    };
}

#endif //NAPI_CANON_API_ERROR_H
