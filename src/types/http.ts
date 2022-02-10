import { HttpResponseCode } from '@srclaunch/types';

export type HttpResponseCodeDetailsType = {
  [key in HttpResponseCode]: {
    failure: boolean;
    retryable: boolean;
  };
};
/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 */
export const HttpResponseCodeDetails: HttpResponseCodeDetailsType = {
  /**
   * __100 - Continue__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100
   * @description
   * The server has received the request headers and the client should proceed to send the request body
   * (in the case of a request for which a body needs to be sent; for example, a POST request).
   * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.
   * To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request
   * and receive a 100 Continue status code in response before sending the body. The response 417 Expectation Failed indicates the request should not be continued.
   */
  [HttpResponseCode.CONTINUE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __101 - Switching Protocols__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101
   * @description
   * The requester has asked the server to switch protocols and the server has agreed to do so.
   */
  [HttpResponseCode.SWITCHING_PROTOCOLS]: {
    failure: true,
    retryable: false,
  },
  /**
   * __102 - Processing__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/102
   * @description
   * Standard response for successful HTTP requests.
   * The actual response will depend on the request method used.
   * In a GET request, the response will contain an entity corresponding to the requested resource.
   * In a POST request, the response will contain an entity describing or containing the result of the action.
   */
  [HttpResponseCode.PROCESSING]: {
    failure: true,
    retryable: false,
  },
  /**
   * __200 - OK__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
   * @description
   * Standard response for successful HTTP requests.
   * The actual response will depend on the request method used.
   * In a GET request, the response will contain an entity corresponding to the requested resource.
   * In a POST request, the response will contain an entity describing or containing the result of the action.
   */
  [HttpResponseCode.OK]: {
    failure: false,
    retryable: false,
  },
  /**
   * __201 - Created__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
   * @description
   * The request has been fulfilled, resulting in the creation of a new resource.
   */
  [HttpResponseCode.CREATED]: {
    failure: false,
    retryable: false,
  },
  /**
   * __202 - Accepted__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202
   * @description
   * The request has been accepted for processing, but the processing has not been completed.
   * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
   * */
  [HttpResponseCode.ACCEPTED]: {
    failure: false,
    retryable: false,
  },
  /**
   * __203 - Non-Authoritative Information__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203
   * @description
   * SINCE HTTP/1.1
   * The server is a transforming proxy that received a 200 OK from its origin,
   * but is returning a modified version of the origin's response.
   */
  [HttpResponseCode.NON_AUTHORITATIVE_INFORMATION]: {
    failure: false,
    retryable: false,
  },
  /**
   * __204 - No Content__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
   * @description
   * The server successfully processed the request and is not returning any content.
   */
  [HttpResponseCode.NO_CONTENT]: {
    failure: false,
    retryable: false,
  },

  /**
   * __205 - Reset Content__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205
   * @description
   * The server successfully processed the request, but is not returning any content.
   * Unlike a 204 response, this response requires that the requester reset the document view.
   */
  [HttpResponseCode.RESET_CONTENT]: {
    failure: false,
    retryable: false,
  },

  /**
   * __206 - Partial Content__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206
   * @description
   * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
   * The range header is used by HTTP clients to enable resuming of interrupted downloads,
   * or split a download into multiple simultaneous streams.
   */
  [HttpResponseCode.PARTIAL_CONTENT]: {
    failure: false,
    retryable: false,
  },

  /**
   * __207 - Multi-Status__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/207
   * @description
   * The message body that follows is an XML message and can contain a number of separate response codes,
   * depending on how many sub-requests were made.
   */
  [HttpResponseCode.MULTI_STATUS]: {
    failure: false,
    retryable: false,
  },

  /**
   * __208 - Already Reported__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/208
   * @description
   * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
   * and are not being included again.
   */
  [HttpResponseCode.ALREADY_REPORTED]: {
    failure: false,
    retryable: false,
  },

  /**
   * __226 - IM used__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/226
   * @description
   * The server has fulfilled a request for the resource,
   * and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
   */
  [HttpResponseCode.IM_USED]: {
    failure: false,
    retryable: false,
  },

  /**
   * __300 - Multiple Choices__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300
   * @description
   * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).
   * For example, this code could be used to present multiple video format options,
   * to list files with different filename extensions, or to suggest word-sense disambiguation.
   */
  [HttpResponseCode.MULTIPLE_CHOICES]: {
    failure: true,
    retryable: false,
  },
  /**
   * __301 - Moved Permanently__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301
   * @remark
   * This and all future requests should be directed to the given URI.
   */
  [HttpResponseCode.MOVED_PERMANENTLY]: {
    failure: true,
    retryable: false,
  },
  /**
   * __302 - Found__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302
   * @description
   * The HyperText Transfer Protocol (HTTP) 302 Found redirect status response code
   * indicates that the resource requested has been temporarily moved to the URL given
   * by the Location header. A browser redirects to this page but search engines don't
   * update their links to the resource (in 'SEO-speak', it is said that the 'link-juice'
   * is not sent to the new URL).
   */
  [HttpResponseCode.FOUND]: {
    failure: true,
    retryable: false,
  },
  /**
   * __303 - See Other__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303
   * @description
   * SINCE HTTP/1.1
   * The response to the request can be found under another URI using a GET method.
   * When received in response to a POST (or PUT/DELETE), the client should presume that
   * the server has received the data and should issue a redirect with a separate GET message.
   */
  [HttpResponseCode.SEE_OTHER]: {
    failure: true,
    retryable: false,
  },
  /**
   * __304 - Not Modified__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304
   * @description
   * Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.
   * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.
   */
  [HttpResponseCode.NOT_MODIFIED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __305 - Use Proxy__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/305
   * @description
   * The requested resource is available only through a proxy, the address for which is provided in the response.
   * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.
   */
  [HttpResponseCode.USE_PROXY]: {
    failure: true,
    retryable: false,
  },
  /**
   * __306 - Switch Proxy__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/306
   * @description
   * No longer used. Originally meant "Subsequent requests should use the specified proxy."
   */
  [HttpResponseCode.SWITCH_PROXY]: {
    failure: true,
    retryable: false,
  },
  /**
   * __307 - Temporary Redirect__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307
   * @description
   * SINCE HTTP/1.1
   * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
   * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.
   * For example, a POST request should be repeated using another POST request.
   */
  [HttpResponseCode.TEMPORARY_REDIRECT]: {
    failure: true,
    retryable: false,
  },
  /**
   * __308 - Permanent Redirect__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308
   * @description
   * The request and all future requests should be repeated using another URI.
   * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.
   * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
   */
  [HttpResponseCode.PERMANENT_REDIRECT]: {
    failure: true,
    retryable: false,
  },
  /**
   * __400 - Bad Request__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
   * @description
   * The server cannot or will not process the request due to an apparent client error
   * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
   */
  [HttpResponseCode.BAD_REQUEST]: {
    failure: true,
    retryable: false,
  },
  /**
   * __401 - Unauthorized__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
   * @description
   * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
   * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
   * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
   * "unauthenticated",i.e. the user does not have the necessary credentials.
   */
  [HttpResponseCode.UNAUTHORIZED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __402 - Payment Required__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
   * @description
   * Reserved for future use. The original intention was that this code might be used as part of some form of digital
   * cash or micro payment scheme, but that has not happened, and this code is not usually used.
   * Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.
   */
  [HttpResponseCode.PAYMENT_REQUIRED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __403 - Forbidden__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403
   * @description
   * The request was valid, but the server is refusing action.
   * The user might not have the necessary permissions for a resource.
   */
  [HttpResponseCode.FORBIDDEN]: {
    failure: true,
    retryable: false,
  },
  /**
   * __404 - Not Found__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
   * @description
   * The requested resource could not be found but may be available in the future.
   * Subsequent requests by the client are permissible.
   */
  [HttpResponseCode.NOT_FOUND]: {
    failure: true,
    retryable: false,
  },
  /**
   * __405 - Method Not Allowed__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
   * @description
   * A request method is not supported for the requested resource;
   * for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
   */
  [HttpResponseCode.METHOD_NOT_ALLOWED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __406 - Not Acceptable__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406
   * @description
   * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
   */
  [HttpResponseCode.NOT_ACCEPTABLE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __407 - Proxy Authentication Required__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407
   * @description
   * The server timed out waiting for the request.
   * According to HTTP specifications:
   * "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."
   */
  [HttpResponseCode.PROXY_AUTHENTICATION_REQUIRED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __408 - Request Time-out__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408
   * @description
   * The server timed out waiting for the request.
   * According to HTTP specifications:
   * "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."
   */
  [HttpResponseCode.REQUEST_TIMEOUT]: {
    failure: true,
    retryable: false,
  },
  /**
   * __409 - Conflict__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
   * @description
   * Indicates that the request could not be processed because of conflict in the request,
   * such as an edit conflict between multiple simultaneous updates.
   */
  [HttpResponseCode.CONFLICT]: {
    failure: true,
    retryable: false,
  },
  /**
   * __410 - Gone__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410
   * @description
   * Indicates that the resource requested is no longer available and will not be available again.
   * This should be used when a resource has been intentionally removed and the resource should be purged.
   * Upon receiving a 410 status code, the client should not request the resource in the future.
   * Clients such as search engines should remove the resource from their indices.
   * Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.
   */
  [HttpResponseCode.GONE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __411 - Length Required__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411
   * @description
   * The request did not specify the length of its content, which is required by the requested resource.
   */
  [HttpResponseCode.LENGTH_REQUIRED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __412 - Precondition Failed__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412
   * @description
   * The server does not meet one of the preconditions that the requester put on the request.
   */
  [HttpResponseCode.PRECONDITION_FAILED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __413 - Payload Too Large__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413
   * @description
   * The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
   */
  [HttpResponseCode.PAYLOAD_TOO_LARGE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __414 - URI Too Long__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414
   * @description
   * The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request,
   * in which case it should be converted to a POST request.
   * Called "Request-URI Too Long" previously.
   */
  [HttpResponseCode.URI_TOO_LONG]: {
    failure: true,
    retryable: false,
  },
  /**
   * __415 - Unsupported Media Type__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415
   * @description
   * The request entity has a media type which the server or resource does not support.
   * For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
   */
  [HttpResponseCode.UNSUPPORTED_MEDIA_TYPE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __416 - Range Not Satisfiable__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416
   * @description
   * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
   * For example, if the client asked for a part of the file that lies beyond the end of the file.
   * Called "Requested Range Not Satisfiable" previously.
   */
  [HttpResponseCode.RANGE_NOT_SATISFIABLE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __417 - Expectation Failed__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417
   * @description
   * The server cannot meet the requirements of the Expect request-header field.
   */
  [HttpResponseCode.EXPECTATION_FAILED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __418 - I'm a teapot__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418
   * @description
   * This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol,
   * and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by
   * teapots requested to brew coffee. This HTTP status is used as an Easter egg in some websites, including Google.com.
   */
  [HttpResponseCode.I_AM_A_TEAPOT]: {
    failure: true,
    retryable: false,
  },
  /**
   * __421 - Misdirected Request__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421
   * @description
   * The request was directed at a server that is not able to produce a response (for example because a connection reuse).
   */
  [HttpResponseCode.MISDIRECTED_REQUEST]: {
    failure: true,
    retryable: false,
  },
  /**
   * __422 - Unprocessable Entity__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422
   * @description
   * The request was well-formed but was unable to be followed due to semantic errors.
   */
  [HttpResponseCode.UNPROCESSABLE_ENTITY]: {
    failure: true,
    retryable: false,
  },
  /**
   * __423 - Locked__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423
   * @description
   * The resource that is being accessed is locked.
   */
  [HttpResponseCode.LOCKED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __424 - Failed Dependency__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424
   * @description
   * The request failed due to failure of a previous request (e.g., a PROPPATCH).
   */
  [HttpResponseCode.FAILED_DEPENDENCY]: {
    failure: true,
    retryable: false,
  },
  /**
   * __425 - Too Early__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425
   * @description
   * Indicates that the server is unwilling to risk processing a request that might be replayed, which creates the potential for a replay attack.
   */
  [HttpResponseCode.TOO_EARLY]: {
    failure: true,
    retryable: false,
  },
  /**
   * __426 - Upgrade Required__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426
   * @description
   * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
   */
  [HttpResponseCode.UPGRADE_REQUIRED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __428 - Precondition Required__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428
   * @description
   * The origin server requires the request to be conditional.
   * Intended to prevent "the 'lost update' problem, where a client
   * GETs a resource's state, modifies it, and PUTs it back to the server,
   * when meanwhile a third party has modified the state on the server, leading to a conflict."
   */
  [HttpResponseCode.PRECONDITION_REQUIRED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __429 - Too Many Requests__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429
   * @description
   * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
   */
  [HttpResponseCode.TOO_MANY_REQUESTS]: {
    failure: true,
    retryable: false,
  },
  /**
   * __431 - Request Header Fields Too Large__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431
   * @description
   * The server is unwilling to process the request because either an individual header field,
   * or all the header fields collectively, are too large.
   */
  [HttpResponseCode.REQUEST_HEADER_FIELDS_TOO_LARGE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __451 - Unavailable For Legal Reasons__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451
   * @description
   * A server operator has received a legal demand to deny access to a resource or to a set of resources
   * that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451.
   */
  [HttpResponseCode.UNAVAILABLE_FOR_LEGAL_REASONS]: {
    failure: true,
    retryable: false,
  },
  /**
   * __500 - Internal Server Error__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
   * @description
   * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
   */
  [HttpResponseCode.INTERNAL_SERVER_ERROR]: {
    failure: true,
    retryable: false,
  },
  /**
   * __501 - Not Implemented__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501
   * @description
   * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
   * Usually this implies future availability (e.g., a new feature of a web-service API).
   */
  [HttpResponseCode.NOT_IMPLEMENTED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __502 - Bad Gateway__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502
   * @description
   * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
   */
  [HttpResponseCode.BAD_GATEWAY]: {
    failure: true,
    retryable: false,
  },
  /**
   * __503 - Service Unavailable__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503
   * @description
   * The server is currently unavailable (because it is overloaded or down for maintenance).
   * Generally, this is a temporary state.
   */
  [HttpResponseCode.SERVICE_UNAVAILABLE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __504 - Gateway Time-out__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504
   * @description
   * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
   */
  [HttpResponseCode.GATEWAY_TIMEOUT]: {
    failure: true,
    retryable: false,
  },
  /**
   * __505 - HTTP Version Not Supported__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505
   * @description
   * The server does not support the HTTP protocol version used in the request.
   */
  [HttpResponseCode.HTTP_VERSION_NOT_SUPPORTED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __506 - Variant Also Negotiates__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506
   * @description
   * Transparent content negotiation for the request results in a circular reference.
   */
  [HttpResponseCode.VARIANT_ALSO_NEGOTIATES]: {
    failure: true,
    retryable: false,
  },
  /**
   * __507 - Insufficient Storage__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507
   * @description
   * The server is unable to store the representation needed to complete the request.
   */
  [HttpResponseCode.INSUFFICIENT_STORAGE]: {
    failure: true,
    retryable: false,
  },
  /**
   * __508 - Loop Detected__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
   * @description
   * The server detected an infinite loop while processing the request.
   */
  [HttpResponseCode.LOOP_DETECTED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __509 - Bandwidth Limit Exceeded__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/509
   * @description
   * The server is temporarily unable to service your request due to exceeding it's allocated bandwidth limit.
   */
  [HttpResponseCode.BANDWIDTH_LIMIT_EXCEEDED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __510 - Not Extended__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510
   * @description
   * Further extensions to the request are required for the server to fulfill it.
   */
  [HttpResponseCode.NOT_EXTENDED]: {
    failure: true,
    retryable: false,
  },
  /**
   * __511 - Network Authentication Required__
   * @remarks HTTP Response Status Code
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511
   * @description
   * The client needs to authenticate to gain network access.
   * Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used
   * to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).
   */
  [HttpResponseCode.NETWORK_AUTHENTICATION_REQUIRED]: {
    failure: true,
    retryable: false,
  },
};
