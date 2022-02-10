import {
  HttpRequestException,
  getExceptionInstance,
} from '@srclaunch/exceptions';
import Logger from '@srclaunch/logger';
import {
  HttpRequestBody,
  HttpRequestMethod,
  HttpRequestResource,
  HttpResponse,
  HttpResponseBody,
  HttpResponseCode,
} from '@srclaunch/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { nanoid } from 'nanoid';

import { HttpClientConfig, HttpClientRequestOptions } from './types';

export type { HttpClientConfig, HttpClientRequestOptions };
//   import { store } from '../index';

const DEFAULT_RETRY_DELAY = 5000;
const DEFAULT_RETRY_COUNT = 0;

const logger = new Logger();

async function RequestHandler<T>({
  body,
  config,
  method,
  options,
  resource,
}: {
  body?: HttpRequestBody;
  config: HttpClientConfig;
  method: HttpRequestMethod;
  options?: HttpClientRequestOptions;
  resource: HttpRequestResource;
}): Promise<HttpResponse<T>> {
  const requestId = nanoid();

  logger.http({
    host: config.host,
    id: requestId,
    method,
    resource,
  });

  const axiosClient = axios.create(config);
  const defaultRetryCondition = (err: AxiosError) => {
    return !err.code;
  };

  const retryCondition = (err: AxiosError) => {
    if (options?.retryCondition) {
      return options.retryCondition(err);
    }

    if (config.options?.retryCondition) {
      return config.options?.retryCondition(err);
    }

    return defaultRetryCondition(err);
  };

  axiosRetry(axiosClient, {
    retries: options?.retries ?? config.options?.retries ?? DEFAULT_RETRY_COUNT,
    retryCondition,
    retryDelay: () =>
      options?.retryDelay ?? config.options?.retryDelay ?? DEFAULT_RETRY_DELAY,
  });

  switch (method) {
    case HttpRequestMethod.Delete:
      return ResponseHandler<T>({
        config,
        method,
        requestId,
        resource,
        response: await axiosClient.delete(
          config.host +
            (config?.basePath ? `/${config?.basePath}` : '') +
            resource,
          {
            headers: {
              ...config.headers,
              'X-Request-Id': requestId,
            },
            validateStatus(status) {
              return status >= 200 && status < 500;
            },
          },
        ),
      });
    case HttpRequestMethod.Get:
      return ResponseHandler<T>({
        config,
        method,
        requestId,
        resource,
        response: await axiosClient.get(
          config.host +
            (config?.basePath ? `/${config?.basePath}` : '') +
            resource,
          {
            headers: {
              ...config.headers,
              'X-Request-Id': requestId,
            },
            validateStatus(status) {
              return status >= 200 && status < 500;
            },
          },
        ),
      });
    case HttpRequestMethod.Head:
      return ResponseHandler<T>({
        config,
        method,
        requestId,
        resource,
        response: await axiosClient.head(
          config.host +
            (config?.basePath ? `/${config?.basePath}` : '') +
            resource,
          {
            headers: {
              ...config.headers,
              'X-Request-Id': requestId,
            },
            validateStatus(status) {
              return status >= 200 && status < 500;
            },
          },
        ),
      });
    case HttpRequestMethod.Post:
      console.log('HEADESra', {
        'X-Request-Id': requestId,
        ...config.headers,
        ...options?.headers,
      });
      return ResponseHandler<T>({
        config,
        method,
        requestId,
        resource,
        response: await axiosClient.post(
          config.host +
            (config?.basePath ? `/${config?.basePath}` : '') +
            resource,
          body,
          {
            headers: {
              'X-Request-Id': requestId,
              ...config.headers,
              ...options?.headers,
            },
            validateStatus(status) {
              return status >= 200 && status < 500;
            },
          },
        ),
      });
    case HttpRequestMethod.Patch:
      return ResponseHandler<T>({
        config,
        method,
        requestId,
        resource,
        response: await axiosClient.patch(
          config.host +
            (config?.basePath ? `/${config?.basePath}` : '') +
            resource,
          body,
          {
            headers: {
              ...config.headers,
              'X-Request-Id': requestId,
            },
            validateStatus(status) {
              return status >= 200 && status < 500;
            },
          },
        ),
      });
    case HttpRequestMethod.Put:
      return ResponseHandler<T>({
        config,
        method,
        requestId,
        resource,
        response: await axiosClient.put(
          config.host +
            (config?.basePath ? `/${config?.basePath}` : '') +
            resource,
          body,
          {
            headers: {
              ...config.headers,
              'X-Request-Id': requestId,
            },
            validateStatus(status) {
              return status >= 200 && status < 500;
            },
          },
        ),
      });
  }
}

async function ResponseHandler<T>({
  config,
  method,
  requestId,
  response,
  resource,
}: {
  config: HttpClientConfig;
  method: HttpRequestMethod;
  requestId: string;
  response: AxiosResponse<HttpRequestException | any>;
  resource: HttpRequestResource;
}): Promise<HttpResponse<T>> {
  const responseCode: HttpResponseCode = response.status;

  if (response.data?.code) {
    const exceptionDetails = {
      file: 'HttpClient',
      func: 'ResponseHandler()',
      request: {
        host: config.host,
        id: requestId,
        method,
        resource: config?.basePath + resource,
      },
      response: {
        status: {
          code: responseCode,
        },
      },
    };

    const exception = getExceptionInstance(response.data?.code);

    if (exception) {
      // logger.exception(exception.toJSON());

      return {
        body: response.data,
        // error: exception.toJSON(),
        headers: response.headers,
        request: {
          id: requestId,
        },
        status: {
          code: response.status,
        },
      };
    }
  }

  return {
    body: response.data,
    headers: response.headers,
    request: {
      id: requestId,
    },
    status: {
      code: response.status,
    },
  };
}

export type HttpClientSignature = {
  delete: <T>(
    resource: HttpRequestResource,
    options?: HttpClientRequestOptions,
  ) => Promise<HttpResponse<HttpResponseBody<T>>>;
  head: (
    resource: HttpRequestResource,
    options?: HttpClientRequestOptions,
  ) => Promise<HttpResponse<null> | null>;
  get: <T>(
    resource: HttpRequestResource,
    options?: HttpClientRequestOptions,
  ) => Promise<HttpResponse<HttpResponseBody<T>>>;
  patch: <T>(
    resource: HttpRequestResource,
    options?: HttpClientRequestOptions,
  ) => Promise<HttpResponse<HttpResponseBody<T>>>;
  post: <T>(
    resource: HttpRequestResource,
    body?: HttpRequestBody,
    options?: HttpClientRequestOptions,
  ) => Promise<HttpResponse<HttpResponseBody<T>>>;
  put: <T>(
    resource: HttpRequestResource,
    body?: HttpRequestBody,
    options?: HttpClientRequestOptions,
  ) => Promise<HttpResponse<HttpResponseBody<T>>>;
};

export function HttpClient(config: HttpClientConfig): HttpClientSignature {
  return {
    delete: async <T>(
      resource: HttpRequestResource,
      options?: HttpClientRequestOptions,
    ) =>
      RequestHandler<T>({
        config,
        method: HttpRequestMethod.Delete,
        options,
        resource,
      }),
    get: async <T>(
      resource: HttpRequestResource,
      options?: HttpClientRequestOptions,
    ) =>
      RequestHandler<T>({
        config,
        method: HttpRequestMethod.Get,
        options,
        resource,
      }),
    head: async (
      resource: HttpRequestResource,
      options?: HttpClientRequestOptions,
    ) =>
      RequestHandler({
        config,
        method: HttpRequestMethod.Head,
        options,
        resource,
      }),
    patch: async <T>(
      resource: HttpRequestResource,
      body?: HttpRequestBody,
      options?: HttpClientRequestOptions,
    ) =>
      RequestHandler<T>({
        body,
        config,
        method: HttpRequestMethod.Put,
        options,
        resource,
      }),
    post: async <T>(
      resource: HttpRequestResource,
      body?: HttpRequestBody,
      options?: HttpClientRequestOptions,
    ) =>
      RequestHandler<T>({
        body,
        config,
        method: HttpRequestMethod.Post,
        options,
        resource,
      }),
    put: async <T>(
      resource: HttpRequestResource,
      body?: HttpRequestBody,
      options?: HttpClientRequestOptions,
    ) =>
      RequestHandler<T>({
        body,
        config,
        method: HttpRequestMethod.Put,
        options,
        resource,
      }),
  };
}
