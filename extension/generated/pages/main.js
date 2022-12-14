
  if (typeof isReactApp === "undefined") {
    var isReactApp = typeof require !== "undefined";
  }

  const configs = {
  "browser": "chrome",
  "storageType": "sync",
  "contextMenuContexts": [
    "browser_action"
  ],
  "collectExtUsageStats": true,
  "env": "prod",
  "WEB_URL": "https://app.requestly.io",
  "firebaseConfig": {
    "apiKey": "AIzaSyC2WOxTtgKH554wCezEJ4plxnMNXaUSFXY",
    "authDomain": "app.requestly.io",
    "databaseURL": "https://requestly.firebaseio.com",
    "projectId": "project-7820168409702389920",
    "storageBucket": "project-7820168409702389920.appspot.com",
    "messagingSenderId": "911299702852"
  },
  "logLevel": "info",
  "stripeConfig": {
    "publishableKey": "pk_live_51KflXlDiNNz2hbmOqdAyoiT6yOwLbz6rqjSHA7tqZc6NII5mJmuCVtUnpAK1A9ZCcBZywXiM3ff41Uln1QXSqqKt00vUoJUf2e"
  }
};
  if (isReactApp) {
    /** For React App */
    module.exports = configs;
  } else {
    /** 
     * For legacy apps- browser extension 
     * Added if-check because desktop app breaks on compilation
     */
    if (window) {
      window.RQ = window.RQ || {};
      window.RQ.configs = configs;  
    }
  }  

RQ.ClientUtils = RQ.ClientUtils || {};

RQ.ClientUtils.executeJS = function (code, shouldRemove) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.className = RQ.ClientUtils.getScriptClassAttribute();

  script.appendChild(document.createTextNode(code));
  const parent = document.head || document.documentElement;
  parent.appendChild(script);

  if (shouldRemove) {
    parent.removeChild(script);
  }
};

RQ.ClientUtils.addRemoteJS = function (src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.className = RQ.ClientUtils.getScriptClassAttribute();

  if (typeof callback === "function") {
    script.onload = callback;
  }

  (document.head || document.documentElement).appendChild(script);
  return script;
};

RQ.ClientUtils.embedCSS = function (css) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  style.className = RQ.ClientUtils.getScriptClassAttribute();

  (document.head || document.documentElement).appendChild(style);
  return style;
};

RQ.ClientUtils.addRemoteCSS = function (src) {
  var link = document.createElement("link");
  link.href = src;
  link.type = "text/css";
  link.rel = "stylesheet";
  link.className = RQ.ClientUtils.getScriptClassAttribute();

  (document.head || document.documentElement).appendChild(link);
  return link;
};

RQ.ClientUtils.onPageLoad = function () {
  return new Promise(function (resolve) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", resolve);
    } else {
      resolve();
    }
  });
};

RQ.ClientUtils.getScriptClassAttribute = function () {
  return RQ.PUBLIC_NAMESPACE + "SCRIPT";
};

RQ.ClientUtils.isHTMLDocument = function () {
  const docType = document.doctype;
  return docType && docType.name === "html";
};

/**
 * This module is define as CommonJS Module. We should move it to ES6 Module later on and fix the imports.
 * Right now the imports are defined using require, once changed to ES6 module we can move to import module
 * @TODO: Remove dependency of configs from constants.
 */
if (typeof isReactApp === "undefined") {
  var isReactApp = typeof require !== "undefined";
}
const CONSTANTS = {};
let CONFIGS;

if (isReactApp) {
  CONFIGS = require("../../config");
} else {
  CONFIGS = window.RQ.configs;
}

CONSTANTS.APP_MODES = {
  DESKTOP: "DESKTOP",
  EXTENSION: "EXTENSION",
  WORDPRESS: "WORDPRESS",
  CLOUDFLARE: "CLOUDFLARE",
};

CONSTANTS.COMPANY_INFO = {
  SUPPORT_EMAIL: "contact@requestly.io",
};

CONSTANTS.VERSION = 3;

CONSTANTS.TRACK_ERRORS = true;

//No. of days to show onboarding after signing up
CONSTANTS.ONBOARDING_DAYS_TO_EXPIRE = 7;

//No. of tasks to complete on onboarding
CONSTANTS.ONBOARDING_TASKS = 5;

CONSTANTS.FILE_PICKER_URL = "/library/filepicker";

CONSTANTS.VERSIONS = {
  REPLACE_RULE: 2,
};

CONSTANTS.ENV = CONFIGS.env;

CONSTANTS.PUBLIC_NAMESPACE = "__REQUESTLY__";

// Url which gets opened when User clicks on browserAction (requestly icon) in toolbar
CONSTANTS.RULES_PAGE_URL = CONFIGS.WEB_URL + "/rules/";

CONSTANTS.RULES_PAGE_URL_PATTERN = CONSTANTS.RULES_PAGE_URL + "*";

CONSTANTS.PRICING_PAGE_URL = CONFIGS.WEB_URL + "/pricing/";

CONSTANTS.GOODBYE_PAGE_URL = CONFIGS.WEB_URL + "/goodbye/";

// URL For Delay Request API
CONSTANTS.DELAY_API_URL = CONFIGS.WEB_URL + "/delay/";

// URL for Mock Server
CONSTANTS.MOCK_URL = CONFIGS.WEB_URL + "/mock/";

CONSTANTS.DESKTOP_APP_URL = CONFIGS.WEB_URL + "/desktop/intercept-traffic";

CONSTANTS.CONSOLE_LOGGER_ENABLED = "console-logger-enabled";

/**
 * We are calling them as BLACK_LIST_DOMAINS
 * however the usage is code is as the URL containing these substrings, We don't touch those requests
 */
CONSTANTS.BLACK_LIST_DOMAINS = [
  "requestly.in",
  "requestly.io",
  "rq.in",
  "rq.io",
  "__rq",
];

CONSTANTS.STRING_CONSTANTS = {
  SLASH: "/",
};

CONSTANTS.LIMITS = {
  NUMBER_SHARED_LISTS: 10,
  NUMBER_EXECUTION_LOGS: 25,
};

CONSTANTS.DEFAULTS = {
  APP_INIT_TIMEOUT: 5000,
};

CONSTANTS.OBJECT_TYPES = {
  GROUP: "group",
  RULE: "rule",
};

CONSTANTS.RULE_TYPES = {
  REDIRECT: "Redirect",
  CANCEL: "Cancel",
  REPLACE: "Replace",
  HEADERS: "Headers",
  USERAGENT: "UserAgent",
  SCRIPT: "Script",
  QUERYPARAM: "QueryParam",
  RESPONSE: "Response",
  REQUEST: "Request",
  DELAY: "Delay",
};

CONSTANTS.DELAY_REQUEST_CONSTANTS = {
  DELAY_PARAM_NAME: "delay", // string to add as query paramName
  DELAY_PARAM_VALUE: "true", // string to add as query paramValue
  MIN_DELAY_VALUE: 1,
  MAX_DELAY_VALUE_NON_XHR: 10000,
  MAX_DELAY_VALUE_XHR: 5000,
  DELAY_TYPE: {
    CLIENT_SIDE: "clientSideDelay",
    SERVER_SIDE: "serverSideDelay",
  },
  REQUEST_TYPE: {
    XHR: "xmlhttprequest",
  },
  METHOD_TYPE: {
    GET: "GET",
  },
};

CONSTANTS.OBJECT_FORMAT_KEYS = {
  CREATION_DATE: "creationDate",
  NAME: "name",
  ID: "id",
  RULE_TYPE: "ruleType",
  STATUS: "status",
  OBJECT_TYPE: "objectType",
  GROUP_ID: "groupId",
  IS_FAVOURITE: "isFavourite",
};

CONSTANTS.HEADER_NAMES = {
  USER_AGENT: "User-Agent",
};

CONSTANTS.GROUP_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

CONSTANTS.RULE_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

CONSTANTS.SUBSCRIPTION_STATUS = {
  ACTIVE: "active",
  CANCELLED: "cancelled",
};

CONSTANTS.RULE_KEYS = {
  URL: "Url",
  HOST: "host",
  PATH: "path",
  HEADER: "Header",
  OVERWRITE: "Overwrite",
  IGNORE: "Ignore",
  PARAM: "param",
  VALUE: "value",
};

CONSTANTS.PATH_FROM_PAIR = {
  RULE_KEYS: "source.key",
  RULE_OPERATORS: "source.operator",
  SCRIPT_LIBRARIES: "libraries",
  SOURCE_PAGE_URL_OPERATOR: "source.filters.pageUrl.operator",
  SOURCE_PAGE_URL_VALUE: "source.filters.pageUrl.value",
  SOURCE_RESOURCE_TYPE: "source.filters.resourceType",
  SOURCE_REQUEST_METHOD: "source.filters.requestMethod",
  SOURCE_REQUEST_PAYLOAD_KEY: "source.filters.requestPayload.key",
  SOURCE_REQUEST_PAYLOAD_VALUE: "source.filters.requestPayload.value",
};

CONSTANTS.URL_COMPONENTS = {
  PROTOCOL: "Protocol",
  URL: "Url",
  HOST: "host",
  PATH: "path",
  QUERY: "query",
  HASH: "hash",
};

CONSTANTS.RULE_OPERATORS = {
  EQUALS: "Equals",
  CONTAINS: "Contains",
  MATCHES: "Matches",
  WILDCARD_MATCHES: "Wildcard_Matches",
};

CONSTANTS.RULE_SOURCE_FILTER_TYPES = {
  PAGE_URL: "pageUrl",
  RESOURCE_TYPE: "resourceType",
  REQUEST_METHOD: "requestMethod",
  REQUEST_DATA: "requestPayload",
};

CONSTANTS.MODIFICATION_TYPES = {
  ADD: "Add",
  REMOVE: "Remove",
  REMOVE_ALL: "Remove All",
  MODIFY: "Modify",
  REPLACE: "Replace",
};

CONSTANTS.NEED_HELP_QUERY_TYPES = {
  FEEDBACK: "Feedback",
  BUG: "Bug",
  QUESTION: "Question",
  FEATURE_REQUEST: "FeatureRequest",
};

CONSTANTS.CLIENT_MESSAGES = {
  GET_SCRIPT_RULES: "getScriptRules",
  DO_SETUP_RESPONSE_RULE_HANDLER: "doSetupResponseRuleHandler",
  GET_USER_AGENT_RULE_PAIRS: "getUserAgentRulePairs",
  OVERRIDE_RESPONSE: "overrideResponse",
  NOTIFY_RULES_APPLIED: "notifyRulesApplied",
  PRINT_CONSOLE_LOGS: "printConsoleLogs",
  GET_SESSION_RECORDING_CONFIG: "getSessionRecordingConfig",
  NOTIFY_SESSION_RECORDING_STARTED: "notifySessionRecordingStarted",
  IS_RECORDING_SESSION: "isRecordingSession",
  GET_TAB_SESSION: "getTabSession",
};

CONSTANTS.EXTENSION_MESSAGES = {
  FOCUS_TAB: "focusTab",
  GET_FULL_LOGS: "getFullLogs",
  CLEAR_LOGS_FOR_TAB: "clearLogsForTab",
  CLEAR_LOGS_FOR_DOMAIN: "clearLogsForDomain",
  GET_FAVOURITE_RULES: "getFavouriteRules",
  GET_PINNED_GROUPS: "getPinnedGroups",
  GET_ALL_RULES: "getAllRules",
  GET_FLAGS: "getFlags",
  GET_TAB_SESSION: "getTabSession",
};

CONSTANTS.HEADERS_TARGET = {
  REQUEST: "Request",
  RESPONSE: "Response",
};

CONSTANTS.REQUEST_TYPES = {
  MAIN_FRAME: "mainFrame",
  PAGE_REQUEST: "pageRequest",
};

CONSTANTS.SCRIPT_TYPES = {
  URL: "url",
  CODE: "code",
};

CONSTANTS.SCRIPT_CODE_TYPES = {
  JS: "js",
  CSS: "css",
};

CONSTANTS.SCRIPT_LOAD_TIME = {
  BEFORE_PAGE_LOAD: "beforePageLoad",
  AFTER_PAGE_LOAD: "afterPageLoad",
};

CONSTANTS.SCRIPT_LIBRARIES = {
  JQUERY: { name: "jQuery", src: "https://code.jquery.com/jquery-2.2.4.js" },
  UNDERSCORE: {
    name: "Underscore",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
  },
};

CONSTANTS.REQUEST_BODY_TYPES = {
  STATIC: "static",
  CODE: "code",
};

CONSTANTS.RESPONSE_BODY_TYPES = {
  STATIC: "static",
  CODE: "code",
  LOCAL_FILE: "local_file",
};

CONSTANTS.RESPONSE_CODES = {
  NOT_FOUND: 404,
};

CONSTANTS.STORAGE_KEYS = {
  REQUESTLY_SETTINGS: "rq_settings",
  USER_INFO: "user_info",
  LATEST_NOTIFICATION_READ_BY_USER: "latestNotificationReadId",
  SESSION_RECORDING_CONFIG: "sessionRecordingConfig",
};

CONSTANTS.MESSAGES = {
  DELETE_ITEMS_NO_SELECTION_WARNING:
    "Please select one or more rules to delete.",
  DELETE_ITEMS: "Are you sure you want to delete the selected items?",
  DELETE_GROUP_WITH_RULES_WARNING:
    "There are some rules contained in this group. Please delete or ungroup them before deleting the group.",
  DELETE_GROUP: "Are you sure you want to delete the group?",
  UNGROUP_ITEMS_NO_SELECTION_WARNING:
    "Please select one or more rules to ungroup.",
  UNGROUP_ITEMS: "Are you sure you want to ungroup the selected items?",
  SIGN_IN_TO_VIEW_SHARED_LISTS: "Please login to view your Shared Lists.",
  SIGN_IN_TO_CREATE_SHARED_LISTS: "Please login to share the selected rules",
  SIGN_IN_TO_SUBMIT_QUERY: "Please login to contact our support team.",
  ERROR_AUTHENTICATION:
    "Received some error in authentication. Please try again later!!",
  SHARED_LISTS_LIMIT_REACHED:
    "You can not create more than" +
    CONSTANTS.LIMITS.NUMBER_SHARED_LISTS +
    "shared lists",
  ERROR_TAB_FOCUS: "The tab cannot be focused, as it might have been closed.",
  DEACTIVATE_REQUESTLY_MENU_OPTION: "Deactivate Requestly",
};

CONSTANTS.RESOURCES = {
  EXTENSION_ICON: "/resources/images/48x48.png",
  EXTENSION_ICON_GREYSCALE: "/resources/images/48x48_greyscale.png",
  EXTENSION_ICON_GREEN: "/resources/images/48x48_green.png",
};

CONSTANTS.SYNC_CONSTANTS = {
  SYNC_TYPES: {
    UPDATE_RECORDS: "update_records",
    REMOVE_RECORDS: "remove_records",
    SESSION_RECORDING_PAGE_CONFIG: "session_recording_page_config",
  },
};

CONSTANTS.GA_EVENTS = {
  CATEGORIES: {
    RULES: "rules",
    RULE: "rule",
    GROUP: "group",
    USER: "user",
    SHARED_LIST: "shared list",
    TRASH: "trash",
    RULE_LOGS: "rule logs",
    EXTENSION: "extension",
    IN_APP_NOTIFICATION: "InAppNotification",
    NEED_HELP_FEATURE: "need help feature",
    PRICING: "pricing",
    LICENSE: "license",
    LIBRARY: "library",
    UNLOCK: "unlock",
    REMOTE_RULES: "remoteRules",
    SPONSOR_SIDERAIL: "sponsor_siderail",
    LOGIN: "login",
    SIGNUP: "signup",
    REFERRAL: "referral",
    PAGE_VISITS: "page visits",
    REQUEST_UPGRADE: "request upgrade",
    MARKETPLACE: "marketplace",
    CHECKOUT: "checkout page",
    TEAMS: "teams page",
    ONBOARDING: "onboarding page",
    RULE_PAIRS: "rule pairs",
    DESKTOP_APP: "desktop app",
  },
  ACTIONS: {
    MODIFIED: "modified",
    CREATED: "created",
    DELETED: "deleted",
    ACTIVATED: "activated",
    DEACTIVATED: "deactivated",
    IMPORTED: "imported",
    EXPORTED: "exported",
    LIMIT_REACHED: "limit reached",
    AUTHENTICATED: "authenticated",
    VIEWED: "viewed",
    CLICKED: "clicked",
    COPIED: "duplicated",
    MARKED_FAVOURITE: "marked favourite",
    UNMARKED_FAVOURITE: "unmarked favourite",
    WORKFLOW_STARTED: "workflow started",
    ALREADY_LOGIN: "already login",
    LOGIN_REQUESTED: "login requested",
    LOGIN_DONE: "login done",
    LOGIN_REJECTED: "login rejected",
    FORM_SUBMITTED: "form submitted",
    FORM_REJECTED: "form rejected",
    INVALID_SUBMIT: "invalid submit",
    GROUPED: "grouped",
    UNGROUPED: "ungrouped",
    SHARED: "shared",
    ERROR: "error occured",
    TASK_COMPLETED: "task completed",
    BACKUP_CREATED: "backup created",
    BACKUP_USED: "backup used",

    CARD_ERROR: "card error",
    CARD_ACCEPTED: "card accepted",
    CARD_ENTERED: "card num and cv entered",

    CURRENCY_CHANGE: "currency_changed",
    DURATION_CHANGE: "duration_changed",
    APPLIED_SUCCESSFULLY: "applied_successfully",
    APPLIED_UNSUCCESSFULLY: "applied_unsuccessfully",

    REVOKED: "revoked",
    BOUGHT: "bought",
    UPDATED: "updated",
    REQUEST_ADMIN: "enterprise_plan_requested",

    UNINSTALLED: "uninstalled",
    UNINSTALL_RESPONSE: "uninstall_response",

    ROUTE_VIEWED: "route_viewed",
    EMAIL_LOGIN_PERFORMED: "email_login_performed",
    EMAIL_SIGNUP_PERFORMED: "email_signup_performed",
    GMAIL_LOGIN_PERFORMED: "gmail_login_performed",
    GMAIL_SIGNUP_PERFORMED: "gmail_signup_performed",
    MICROSOFT_LOGIN_PERFORMED: "microsoft_login_performed",
    APPLE_LOGIN_PERFORMED: "apple_login_performed",

    REFERRAL_APPLIED: "referral_applied",
    REFERRAL_FAILED: "referral_failed",

    EMAIL_VERIFICATION_RESEND: "resend_email_verification",
    EMAIL_VERIFICATION_SUCCESSFUL: "email_verification_successful",
    EMAIL_VERIFICATION_FAILED: "email_verification_failed",

    TRAFFIC_TABLE_VIEWED: "traffic_table_viewed",
    TRAFFIC_TABLE_MODIFIED: "traffic_table_modified",

    APP_LAUNCHED: "app_launched",
    APP_CLOSED: "app_closed",
    APP_NOT_LAUNCHED: "app_not_launched",
    PROXY_SERVER: "proxy_server_started",
    BG_PROCESS: "bg_process_started",

    MANUAL_SETUP_MAC: "manual_setup_mac",

    DARK_MODE_ENABLED: "dark_mode_enabled",
    DARK_MODE_DISABLED: "dark_mode_disabled",
    UPGRADE_REQUIRED_FOR_DARK_MODE: "upgrade_required_for_dark_mode",

    SIMULATE_RULE: "simulate_rule",
    EXECUTION_LOGS: "execution_logs",

    SOURCE_FILTER_FORMAT_UPGRADED: "source_filter_format_upgraded",
    HEADER_RULES_MIGRATED_TO_V2: "header_rules_migrated_to_v2",
    PROMO_BANNER_CLICKED: "promo_banner_clicked",
  },
  ATTR: {
    PAYMENT_MODE: "payment_mode",
    PLANNAME: "planname",
    PLAN_DURATION: "plan_duration",
    PLAN_ID: "plan_id",
    PLAN_START_DATE: "plan_startDate",
    PLAN_END_DATE: "plan_endDate",
    COUPON: "coupon",
    COUPON_VALUE: "coupon_value",
    LICENSE: "licensekey",
    COMPANY: "company",

    PROFILE: "profile",

    REMOTE_RULES_ENDPOINT: "remoteRulesEndpoint",
    REMOTE_RULES_FREQUENCY: "remoteRulesFrequency",

    NUM_RULES: "NUM_RULES",
    NUM_ACTIVE_RULES: "NUM_ACTIVE_RULES",
    NUM_GROUPS: "NUM_GROUPS",
    NUM_ACTIVE_GROUPS: "NUM_ACTIVE_GROUPS",
    NUM_SHARED_LISTS: "NUM_SHARED_LISTS",

    ONBOARDING_V1_DONE: "ONBOARDING_V1_DONE",

    SIGNUP_DATE: "SIGNUP_DATE",

    EXTENSION_INSTALL_DATE: "install_date",
    DESKTOP_INSTALL_DATE: "desktop_install_date",

    APP_MODE: "APP_MODE",
    EMAIL_TYPE: "EMAIL_TYPE",
    EMAIL_DOMAIN: "EMAIL_DOMAIN",
    IS_PREMIUM: "IS_PREMIUM",

    HAS_AVAILED_TWITTER_TRIAL: "HAS_AVAILED_TWITTER_TRIAL",
    HAS_AVAILED_CHROME_STORE_TRIAL: "HAS_AVAILED_CHROME_STORE_TRIAL",
    HAS_AVAILED_GITHUB_TRIAL: "HAS_AVAILED_GITHUB_TRIAL",
    TRIAL_MODE_ENABLED: "trial_mode_enabled",
  },
  VALUES: {
    PAYPAL: "paypal",
  },
  GA_CUSTOM_DIMENSIONS: {
    USER_ID: "dimension1",
  },
  GA_CUSTOM_METRICS: {
    num_rules: "metric1",
  },
};

CONSTANTS.USER = {
  AUTHORIZED: "authorized-user",
  UNAUTHORIZED: "unauthorized-user",
};

CONSTANTS.FIREBASE_NODES = {
  USERS: "users",
  PUBLIC: "public",
  SHARED_LISTS: "sharedLists",
  FEEDBACK: "feedback",
  FILES: "files",
};

CONSTANTS.DATASTORE = {
  ACTIONS: {
    CHECK_USER_AUTH: "check:userAuthenticated",
    AUTHENTICATE: "authenticate",
    FETCH_USER_DETAILS: "fetchUserDetails",
    GETVALUE: "getValue",
    SETVALUE: "setValue",
  },
};

CONSTANTS.MESSAGE_HANDLER = {
  ACTIONS: {
    SUBMIT_EVENT: "submitEvent",
    SUBMIT_ATTR: "submitAttr",
  },
  MESSAGE_TYPES: {
    EVENT: "event",
    ATTRIBUTE: "attribute",
  },
  SINKS: {
    CUSTOMERLY: "customerly",
  },
};

CONSTANTS.REQUEST_STATE = {
  LOADING: "LOADING",
  COMPLETE: "COMPLETE",
};

CONSTANTS.getSharedListURL = function (shareId, sharedListName) {
  const formattedSharedListName = sharedListName
    .replace(new RegExp(" +|/+", "g"), "-")
    .replace(/-+/g, "-");
  return (
    CONSTANTS.RULES_PAGE_URL +
    "#sharedList/" +
    shareId +
    "-" +
    formattedSharedListName
  );
};

CONSTANTS.getSharedListTimestamp = function (sharedListId) {
  return sharedListId.split("-")[0];
};

CONSTANTS.fireAjax = function (requestURL, async) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", requestURL, async);
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject();
        }
      }
    };
    request.send();
  });
};

if (isReactApp) {
  module.exports = CONSTANTS;
} else {
  /** For legacy apps- browser extension */
  Object.assign(window.RQ, CONSTANTS);
}

window.RQ = window.RQ || {};
RQ.Utils = RQ.Utils || {};

RQ.Utils.regexFormat = "^/(.+)/(|i|g|ig|gi)$";

RQ.Utils.isValidRegex = function (regexStr) {
  return regexStr.search(new RegExp(RQ.Utils.regexFormat)) !== -1;
};

RQ.Utils.toRegex = function (regexStr) {
  var isRegexStringValid = this.isValidRegex(regexStr),
    matchRegExp;

  if (!isRegexStringValid) {
    return null;
  }
  matchRegExp = regexStr.match(new RegExp(RQ.Utils.regexFormat));

  return new RegExp(matchRegExp[1], matchRegExp[2]);
};

RQ.Utils.isValidUrl = function (url) {
  return url.search(/^http:|https:|ftp:|javascript:/) === 0;
};

RQ.Utils.getId = function () {
  return Date.now();
};

RQ.Utils.getCurrentTime = function () {
  return Date.now();
};

RQ.Utils.formatDate = function (dateInMilis, format) {
  const d = new Date(dateInMilis);

  if (dateInMilis && format === "yyyy-mm-dd") {
    let month = d.getMonth() + 1,
      date = d.getDate();

    date = String(date).length < 2 ? "0" + date : String(date);
    month = String(month).length < 2 ? "0" + month : String(month);

    return d.getFullYear() + "-" + month + "-" + date;
  }
};

RQ.Utils.reloadPage = function (wait) {
  wait = wait || 0;

  setTimeout(function () {
    window.location.reload();
  }, wait);
};

RQ.Utils.submitEvent = function (
  eventCategory,
  eventAction,
  eventLabel,
  eventValue
) {
  if (!eventLabel) {
    eventLabel = eventCategory + " " + eventAction;
  }

  RQ.ContentScriptMessageHandler.sendMessage({
    action: RQ.MESSAGE_HANDLER.ACTIONS.SUBMIT_EVENT,
    eventCategory: eventCategory,
    eventAction: eventAction,
    eventLabel: eventLabel,
    eventValue: eventValue,
  });
};

RQ.Utils.submitAttr = function (attr, value) {
  const messageToSend = {
    action: RQ.MESSAGE_HANDLER.ACTIONS.SUBMIT_ATTR,
    attr: attr,
    value: value,
  };

  RQ.ContentScriptMessageHandler.sendMessage(messageToSend);
};

RQ.Utils.removeLastPart = function (str, separater) {
  str = str || "";

  // Return original string when separator is not present
  if (str.indexOf(separater) === -1) {
    return str;
  }

  str = str.split(separater);

  // Remove last part
  str.length--;

  return str.join(separater);
};

RQ.Utils.setCookie = function (name, value, maxAge) {
  document.cookie = name + "=" + value + "; path=/" + "; max-age=" + maxAge;
};

RQ.Utils.readCookie = function (name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
};

RQ.Utils.eraseCookie = function (name) {
  RQ.Utils.setCookie(name, "", 1);
};

/**
 *
 * @param url Url from which component has to be extracted
 * @param name Url component name - host, path, url, query, fragment etc.
 */
RQ.Utils.extractUrlComponent = function (url, name) {
  if (!window.dummyAnchor) {
    window.dummyAnchor = document.createElement("a");
  }

  window.dummyAnchor.href = url;

  switch (name) {
    case RQ.URL_COMPONENTS.URL:
      return url;
    case RQ.URL_COMPONENTS.PROTOCOL:
      return window.dummyAnchor.protocol;
    case RQ.URL_COMPONENTS.HOST:
      return window.dummyAnchor.host;
    case RQ.URL_COMPONENTS.PATH:
      return window.dummyAnchor.pathname;
    case RQ.URL_COMPONENTS.QUERY:
      return window.dummyAnchor.search;
    case RQ.URL_COMPONENTS.HASH:
      return window.dummyAnchor.hash;
  }

  console.error("Invalid source key", url, name);
};

/**
 *
 * @param queryString e.g. ?a=1&b=2 or a=1 or ''
 * @returns object { paramName -> [value1, value2] }
 */
RQ.Utils.getQueryParamsMap = function (queryString) {
  var map = {},
    queryParams;

  if (!queryString || queryString === "?") {
    return map;
  }

  if (queryString[0] === "?") {
    queryString = queryString.substr(1);
  }

  queryParams = queryString.split("&");

  queryParams.forEach(function (queryParam) {
    var paramName = queryParam.split("=")[0],
      paramValue = queryParam.split("=")[1];

    // We are keeping value of param as array so that in future we can support multiple param values of same name
    // And we do not want to lose the params if url already contains multiple params of same name
    map[paramName] = map[paramName] || [];
    map[paramName].push(paramValue);
  });

  return map;
};

/**
 * Convert a map to keyvalue pair string (Used for query params)
 * @param queryParamsMap
 * @returns {string}
 */
RQ.Utils.convertQueryParamMapToString = function (queryParamsMap) {
  var queryParamsArr = [];

  for (var paramName in queryParamsMap) {
    var values = queryParamsMap[paramName] || [];

    values.forEach(function (paramValue) {
      if (typeof paramValue === "undefined") {
        queryParamsArr.push(paramName);
      } else {
        queryParamsArr.push(paramName + "=" + paramValue);
      }
    });
  }

  return queryParamsArr.join("&");
};

RQ.Utils.getUrlWithoutQueryParamsAndHash = function (url) {
  var urlWithoutHash = url.split("#")[0];

  return urlWithoutHash.split("?")[0];
};

/**
 * Add a Query Param to URL
 * @param {string} url Url to which query string has to be added
 * @param {string} paramName The paramName to be added
 * @param {string} paramValue The paramValue of the paramName
 * @param {boolean} overwrite Whether to overwrite the existing queryStrign or not
 * @returns {string} A well formatted url with addition of given query param
 */
RQ.Utils.addQueryParamToURL = function (url, paramName, paramValue, overwrite) {
  let resultingUrl = url,
    urlWithoutQueryParamsAndHash = RQ.Utils.getUrlWithoutQueryParamsAndHash(
      url
    ),
    urlHash = RQ.Utils.extractUrlComponent(url, RQ.URL_COMPONENTS.HASH),
    queryString = RQ.Utils.extractUrlComponent(url, RQ.URL_COMPONENTS.QUERY),
    queryParamsMap = RQ.Utils.getQueryParamsMap(queryString);

  if (overwrite) {
    queryParamsMap[paramName] = [];
  } else {
    queryParamsMap[paramName] = queryParamsMap[paramName] || [];
  }

  queryParamsMap[paramName].push(paramValue);

  queryString = RQ.Utils.convertQueryParamMapToString(queryParamsMap);

  resultingUrl = queryString
    ? urlWithoutQueryParamsAndHash + "?" + queryString
    : urlWithoutQueryParamsAndHash;
  resultingUrl += urlHash;

  return resultingUrl;
};

/**
 * Adds Delay by running a loop for desired time
 * @param {Number} milliseconds Time in ms for which to add delay
 * @returns {Void} Void
 */
RQ.Utils.addDelay = function (milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

/**
 * Generates Id for a execution log- a random 6 digit number is added to current epoch time
 * to generate a unique ID. I works as the number of digits in current time wont be affected
 * by adding an 6 digit number.
 * Also added an unit test to verify ID length
 * @returns {String} id
 */

RQ.Utils.generateExecutionLogId = function () {
  return `executionLog_${Date.now() + Math.floor(Math.random() * 1000000)}`;
};

/**
 * This code is also copied in responseRuleHandler.js So if you change anything inside this, please update there as well
 * And test across multiple sites using Modify Response Rule
 * @param {String} mightBeJSONString
 * @returns JSON Object if the string is JSON String otherwise returns the same string
 */
RQ.Utils.jsonifyValidJSONString = (mightBeJSONString) => {
  if (typeof mightBeJSONString !== "string") return mightBeJSONString;

  try {
    return JSON.parse(mightBeJSONString);
  } catch (e) {
    /* Do Nothing. Unable to parse the param value */
  }

  return mightBeJSONString;
};

/**
 * This code is also copied in responseRuleHandler.js So if you change anything inside this, please update there as well
 * And test across multiple sites using Modify Response Rule
 * @param {String} url
 * @returns JSON Object for the searchParams. Handle decoding of Params and JSON Strings
 */
RQ.Utils.convertSearchParamsToJSON = (url) => {
  const result = {};

  if (!url || url === "?" || url.indexOf("?") === -1) {
    return result;
  }

  // https://stackoverflow.com/a/50147341/816213
  // (URL decoding is already handled in URLSearchParams)
  const searchParamsString = url.split("?")[1];
  const paramsObject = Object.fromEntries(
    new URLSearchParams(searchParamsString)
  );

  // Traverse paramsObject to convert JSON strings into JSON object
  for (paramName in paramsObject) {
    const paramValue = paramsObject[paramName];
    paramsObject[paramName] = RQ.Utils.jsonifyValidJSONString(paramValue);
  }

  return paramsObject;
};
/**
 * This code is also copied in responseRuleHandler.js So if you change anything inside this, please update there as well
 * And test across multiple sites using Modify Response Rule
 * @param {Object} json
 * @param {String} path -> "a", "a.b", "a.0.b (If a is an array containing list of objects"
 * @returns value or undefined
 */
RQ.Utils.traverseJsonByPath = (jsonObject, path) => {
  if (!path) return;

  const pathParts = path.split(".");

  try {
    // Reach the last node but not the leaf node.
    for (i = 0; i < pathParts.length - 1; i++) {
      jsonObject = jsonObject[pathParts[i]];
    }

    return jsonObject[pathParts[pathParts.length - 1]];
  } catch (e) {
    /* Do nothing */
  }
};

/**
 * Set given value in an Object at given Path. Modifies the original object.
 * @param {Object} incomingObject Object to be modified
 * @param {String} path example -> "a", "a.b", "a.0.b
 * @param {*} value The value to be path
 * @returns value or undefined
 */
RQ.Utils.setObjectValueAtPath = (incomingObject, path, value) => {
  if (
    typeof incomingObject !== "object" ||
    Array.isArray(incomingObject) ||
    incomingObject === null
  )
    return;

  if (typeof path !== "string") return;

  let schema = incomingObject;
  const pList = path.split(".");
  const len = pList.length;
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }
  schema[pList[len - 1]] = value;
};

window.RQ = window.RQ || {};

RQ.ContentScriptMessageHandler = {
  eventCallbackMap: {},
  requestId: 1,

  constants: {
    CONTENT_SCRIPT: "content_script",
    PAGE_SCRIPT: "page_script",
    DOMAIN: RQ.configs.WEB_URL,
    SOURCE_FIELD: "source",
    ACTION_USER_LOGGED_IN: "user:loggedIn",
  },

  addMessageListener: function () {
    window.addEventListener("message", this.handleMessageReceived.bind(this));
  },

  getSource: function () {
    return this.constants.CONTENT_SCRIPT;
  },

  registerCallback: function (message, callback) {
    if (!callback) return;

    // Message has requestId when we are sending response
    const requestIdToUse = this.requestId++;
    this.eventCallbackMap[message.action + "_" + requestIdToUse] = callback;
    message.requestId = requestIdToUse;
  },

  invokeCallback: function (event) {
    const callbackRef = this.eventCallbackMap[
      event.data.action + "_" + event.data.requestId
    ];

    if (typeof callbackRef === "function") {
      // We should remove the entry from map first before executing the callback otherwise we will store stale references of functions
      delete this.eventCallbackMap[event.data.action];
      callbackRef.call(this, event.data.response);
    }
  },

  sendMessage: function (message, callback) {
    if (!message.action) {
      Logger.error("Invalid message. Must contain some action");
      return;
    }

    this.registerCallback(message, callback);

    message[this.constants.SOURCE_FIELD] = this.getSource();
    window.postMessage(message, this.constants.DOMAIN);
  },

  sendResponse: function (originalEventData, response) {
    const message = {
      action: originalEventData.action,
      requestId: originalEventData.requestId,
      response: response,
    };

    message[this.constants.SOURCE_FIELD] = this.constants.CONTENT_SCRIPT;
    window.postMessage(message, this.constants.DOMAIN);
  },

  handleMessageReceived: function (event) {
    const that = this;

    if (event && event.origin !== RQ.configs.WEB_URL) {
      if (RQ.configs.logLevel === "debug") {
        console.log(
          "Ignoring message from the following domain",
          event.origin,
          event.data
        );
      }

      return;
    }

    if (
      event &&
      event.data &&
      event.data.source === this.constants.PAGE_SCRIPT
    ) {
      RQ.configs.logLevel === "debug" &&
        console.log("Received message:", event.data);

      // Check whether it is a response to invoke callback or a request to perform an action
      if (typeof event.data.response !== "undefined") {
        return this.invokeCallback(event);
      }

      // Process actions
      if (event.data.action === "GET_STORAGE_TYPE") {
        StorageService.getStorageType().then((storageType) => {
          that.sendResponse(event.data, { storageType });
        });
      } else if (event.data.action === "SET_STORAGE_TYPE") {
        StorageService.setStorageType(event.data.storageType).then(() => {
          that.sendResponse(event.data, { success: true });
        });
      } else if (event.data.action === "GET_STORAGE_INFO") {
        StorageService.getStorageType().then((storageType) => {
          chrome.storage[storageType].get(null, (superObject) => {
            const storageCachedRecords = [];
            for (let key in superObject) {
              if (
                superObject[key].hasOwnProperty("objectType") ||
                superObject[key].hasOwnProperty("ruleType")
              ) {
                storageCachedRecords.push(superObject[key]);
              }
            }

            that.sendResponse(event.data, {
              storageType: storageType,
              numItems: storageCachedRecords.length,
              bytesUsed: JSON.stringify(storageCachedRecords).length,
            });
          });
        });
      } else if (event.data.action === "GET_STORAGE_SUPER_OBJECT") {
        StorageService.getStorageType().then((storageType) => {
          chrome.storage[storageType].get(null, (superObject) => {
            that.sendResponse(event.data, superObject);
          });
        });
      } else if (event.data.action === "GET_STORAGE_OBJECT") {
        StorageService.getStorageType().then((storageType) => {
          chrome.storage[storageType].get(event.data.key, (obj) => {
            that.sendResponse(event.data, obj[event.data.key]);
          });
        });
      } else if (event.data.action === "SAVE_STORAGE_OBJECT") {
        StorageService.getStorageType().then((storageType) => {
          chrome.storage[storageType].set(event.data.object, () => {
            that.sendResponse(event.data);
          });
        });
      } else if (event.data.action === "REMOVE_STORAGE_OBJECT") {
        StorageService.getStorageType().then((storageType) => {
          chrome.storage[storageType].remove(event.data.key, () => {
            that.sendResponse(event.data);
          });
        });
      } else if (event.data.action === "CLEAR_STORAGE") {
        StorageService.getStorageType().then((storageType) => {
          chrome.storage[storageType].clear(() => {
            that.sendResponse(event.data);
          });
        });
      } else if (event.data.action === "GET_REMOTE_RULES_SETTINGS") {
        StorageService.getRecordFromStorage(
          "remote_rules_settings",
          "sync"
        ).then((obj) => that.sendResponse(event.data, obj || {}));
      } else if (event.data.action === "GET_USER_INFO") {
        StorageService.getRecordFromStorage("user_info", "sync").then((obj) =>
          that.sendResponse(event.data, obj || {})
        );
      } else if (event.data.action === "SET_REMOTE_RULES_SETTINGS") {
        StorageService.saveRecordInStorage(
          { remote_rules_settings: event.data.remoteRulesSettings },
          "sync"
        )
          .then(() => {
            // Inform background to start the import periodically
            return new Promise((resolve) =>
              chrome.runtime.sendMessage(
                { action: RQ.EXTENSION_MESSAGES.REMOTE_RULES_SETTINGS_CHANGED },
                resolve
              )
            );
          })
          .then(() => {
            // Send the response back to App UI to show notification
            that.sendResponse(event.data, { success: true });
          });
      } else if (
        [
          RQ.EXTENSION_MESSAGES.FOCUS_TAB,
          RQ.EXTENSION_MESSAGES.GET_FULL_LOGS,
          RQ.EXTENSION_MESSAGES.CLEAR_LOGS_FOR_TAB,
          RQ.EXTENSION_MESSAGES.CLEAR_LOGS_FOR_DOMAIN,
          RQ.EXTENSION_MESSAGES.GET_FLAGS,
          RQ.EXTENSION_MESSAGES.GET_TAB_SESSION,
        ].includes(event.data.action)
      ) {
        this.delegateMessageToBackground(event.data);
      }
    }
  },

  delegateMessageToBackground: function (message) {
    const that = this;
    chrome.runtime.sendMessage(message, (bgResponse) => {
      that.sendResponse(message, bgResponse);
    });
  },

  init: function () {
    this.addMessageListener();
  },
};

RQ.ContentScriptMessageHandler.init();

window.RQ = window.RQ || {};

RQ.DataStoreUtils = {
  isUserAuthenticated: function (callback) {
    RQ.ContentScriptMessageHandler.sendMessage(
      {
        action: RQ.DATASTORE.ACTIONS.CHECK_USER_AUTH,
      },
      callback
    );
  },

  fetchUserDetails: function () {
    return new Promise((resolve, reject) => {
      try {
        RQ.ContentScriptMessageHandler.sendMessage(
          { action: RQ.DATASTORE.ACTIONS.FETCH_USER_DETAILS },
          resolve
        );
      } catch (e) {
        reject(e);
      }
    });
  },

  authenticate: function (callback) {
    RQ.ContentScriptMessageHandler.sendMessage(
      { action: RQ.DATASTORE.ACTIONS.AUTHENTICATE },
      callback
    );
  },

  getValue: function (pathArray) {
    return new Promise((resolve, reject) => {
      try {
        RQ.ContentScriptMessageHandler.sendMessage(
          { action: RQ.DATASTORE.ACTIONS.GETVALUE, pathArray: pathArray },
          resolve
        );
      } catch (e) {
        reject(e);
      }
    });
  },

  setValue: function (pathArray, value, callback) {
    RQ.ContentScriptMessageHandler.sendMessage(
      {
        action: RQ.DATASTORE.ACTIONS.SETVALUE,
        pathArray: pathArray,
        value: value,
      },
      callback
    );
  },
};

window.RQ = window.RQ || {};
RQ.UserAgentLibrary = RQ.UserAgentLibrary || {};

RQ.UserAgentLibrary = {
  USER_AGENT: {
    device: {
      android: {
        name: "Android",
        values: {
          phone: {
            name: "Android Phone",
            value:
              "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Mobile Safari/537.36", // Pixel 2
          },
          tablet: {
            name: "Android Tablet",
            value:
              "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36", // Nexus 10
          },
        },
      },
      apple: {
        name: "Apple",
        values: {
          iphone: {
            name: "Apple iPhone",
            value:
              "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1", // iPhone X
          },
          ipad: {
            name: "Apple iPad",
            value:
              "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
          },
        },
      },
      windows: {
        name: "Windows",
        values: {
          phone: {
            name: "Windows Phone",
            value:
              "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)",
          },
          tablet: {
            name: "Windows Tablet",
            value:
              "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; Touch; NOKIA; Lumia 920)",
          },
        },
      },
      blackberry: {
        name: "Blackberry",
        values: {
          phone: {
            name: "Blackberry Phone",
            value:
              "Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.0.0.187 Mobile Safari/534.11",
          },
          tablet: {
            name: "Blackberry Tablet",
            value:
              "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.8 (KHTML, like Gecko) Version/7.2.0.0 Safari/535.8",
          },
        },
      },
      symbian_phone: {
        name: "Symbian Phone",
        value:
          "Mozilla/5.0 (SymbianOS) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.1.33 Mobile Safari/533.4 3gpp-gba",
      },
    },
    browser: {
      chrome: {
        name: "Google Chrome",
        values: {
          windows: {
            name: "Chrome on Windows",
            value:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
          },
          macintosh: {
            name: "Chrome on Macintosh",
            value:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
          },
          linux: {
            name: "Chrome on Linux",
            value:
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
          },
        },
      },
      firefox: {
        name: "Mozilla Firefox",
        values: {
          windows: {
            name: "Firefox on Windows",
            value:
              "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0",
          },
          macintosh: {
            name: "Firfox on Macintosh",
            value:
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:52.0) Gecko/20100101 Firefox/52.0",
          },
          linux: {
            name: "Firefox on Linux",
            value:
              "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
          },
        },
      },
      safari: {
        name: "Safari",
        value:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/602.4.8 (KHTML, like Gecko) Version/10.0.3 Safari/602.4.8",
      },
      msie: {
        name: "Microsoft Internet Explorer",
        values: {
          msie6: {
            name: "Internet Explorer 6",
            value: "Mozilla/4.0(compatible; MSIE 6.0; Windows NT 5.1)",
          },
          msie7: {
            name: "Internet Explorer 7",
            value: "Mozilla/4.0(compatible; MSIE 7.0; Windows NT 6.0)",
          },
          msie8: {
            name: "Internet Explorer 8",
            value:
              "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
          },
          msie9: {
            name: "Internet Explorer 9",
            value:
              "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
          },
          msie10: {
            name: "Internet Explorer 10",
            value:
              "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)",
          },
          msie11: {
            name: "Internet Explorer 11",
            value:
              "Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko",
          },
        },
      },
      msedge: {
        name: "Microsoft Edge",
        value:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240",
      },
      opera: {
        name: "Opera",
        value:
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36 OPR/15.0.1147.100",
      },
    },
  },

  getDefaultUserAgent: function () {
    return (navigator && navigator.userAgent) || "";
  },
};

window.RQ = window.RQ || {};
RQ.DOMUtils = RQ.DOMUtils || {};

/**
 *
 * @param $el Element on which class should be toggled
 * @param className Class to be toggled
 * @param condition Boolean Condition - When true class will be added otherwise removed
 */
RQ.DOMUtils.toggleClass = function ($el, className, condition) {
  condition ? $el.addClass(className) : $el.removeClass(className);
};

/**
 * Wrapper over Chrome Storage Service APIs.
 * Usage
 * StorageService
 *  .getInstance({ cacheRecords: true }, context})
 *  .then(() => ...);
 */

(function (window) {
  // Karma tests complain that StorageService is already defined therefore exit when StorageService already exists
  if (window.StorageService && typeof window.StorageService === "function") {
    return;
  }

  window.StorageService = class {
    /**
     *
     * @param options StorageService constructor options
     * @param context Context on which to bind e.g. getInstance({}, RQ).
     * Since initialization is async therefore context is taken as an argument
     * @returns {Promise<any>}
     */
    static getInstance(options, context) {
      return new Promise((resolve) => {
        StorageService.getStorageType().then((storageType) => {
          options.DB = storageType;
          context.StorageService = new StorageService(options);

          resolve();
        });
      });
    }

    constructor(options) {
      this.DB = options.DB
        ? chrome.storage[options.DB]
        : chrome.storage[RQ.configs.storageType];
      this.primaryKeys = options.primaryKeys || ["objectType", "ruleType"];
      this.records = [];
      this.isRecordsFetched = false;
      this.cachingEnabled = options["cacheRecords"];

      if (this.cachingEnabled) {
        chrome.storage.onChanged.addListener(this.updateRecords.bind(this));
      }

      this.saveRecordWithID = this.saveRecordWithID.bind(this);
      this.saveRecord = this.saveRecord.bind(this);
      this.getRecord = this.getRecord.bind(this);
      this.getRecords = this.getRecords.bind(this);
    }

    static getStorageType() {
      return new Promise((resolve) => {
        StorageService.getRecordFromStorage("storageType", "sync").then(
          (storageType) => {
            // If there is no storageType stored, fallback to default setting
            resolve(storageType || RQ.configs.storageType);
          }
        );
      });
    }

    static setStorageType(newStorageType) {
      return StorageService.saveRecordInStorage(
        { storageType: newStorageType },
        "sync"
      );
    }

    getRecords(objectType, forceFetch) {
      const self = this;

      return new Promise((resolve, reject) => {
        /* If records have been read from storage, return the cached values */
        if (self.cachingEnabled && self.isRecordsFetched && !forceFetch) {
          resolve(self.filterRecordsByType(self.records, objectType));
          return;
        }

        // Clear the existing records
        self.records.length = 0;

        self.DB.get(null, function (superObject) {
          for (let key in superObject) {
            if (self.hasPrimaryKey(superObject[key])) {
              self.records.push(superObject[key]);
            }
          }

          self.isRecordsFetched = true;
          resolve(self.filterRecordsByType(self.records, objectType));
        });
      });
    }

    hasPrimaryKey(record) {
      for (let index = 0; index < this.primaryKeys.length; index++) {
        if (typeof record[this.primaryKeys[index]] !== "undefined") {
          return true;
        }
      }

      return false;
    }

    filterRecordsByType(records, requestedObjectType) {
      if (!requestedObjectType) {
        return records;
      }

      return records.filter((record) => {
        let objectType = record.objectType || RQ.OBJECT_TYPES.RULE;
        return objectType === requestedObjectType;
      });
    }

    saveRecord(object) {
      return new Promise((resolve, reject) => {
        this.DB.set(object, resolve);
      });
    }

    /**
     * Saves the object which contains ID so that we do not need to specify id as the key and whole object as value
     * @param object
     * @returns {Promise<any>}
     */
    saveRecordWithID(object) {
      return new Promise((resolve) => {
        this.DB.set({ [object.id]: object }, resolve);
      });
    }

    static saveRecordInStorage(object, storageType) {
      return new Promise((resolve) =>
        chrome.storage[storageType].set(object, resolve)
      );
    }

    static getRecordFromStorage(key, storageType) {
      return new Promise((resolve) =>
        chrome.storage[storageType].get(key, (obj) => resolve(obj[key]))
      );
    }

    getRecord(key) {
      const self = this;
      return new Promise((resolve) =>
        self.DB.get(key, (obj) => resolve(obj[key]))
      );
    }

    removeRecord(key) {
      const self = this;
      return new Promise((resolve) => self.DB.remove(key, resolve));
    }

    getCachedRecord(key) {
      const recordIndex = this.getCachedRecordIndex(key);
      return this.records[recordIndex];
    }

    getCachedRecordIndex(keyToFind) {
      for (
        let recordIndex = 0;
        recordIndex < this.records.length;
        recordIndex++
      ) {
        const recordKey = this.records[recordIndex].id;

        if (recordKey === keyToFind) {
          return recordIndex;
        }
      }

      return -1;
    }

    /**
     * StorageService.records are updated on every add/edit/delete operation
     * So that background rules can be updated which are executed when each request URL is intercepted
     * @param changes SuperObject with key as Object key which is changed with old and new values
     * @param namespace Storage type: 'sync' or 'local'
     */
    updateRecords(changes, namespace) {
      var changedObject, changedObjectIndex, objectExists, changedObjectKey;

      // If storageType is changed then source the data in new storage
      if (
        namespace === "sync" &&
        changes.hasOwnProperty("storageType") &&
        changes["storageType"].newValue
      ) {
        this.switchStorageType(changes["storageType"].newValue);
        return;
      }

      if (this.DB === chrome.storage[namespace]) {
        for (changedObjectKey in changes) {
          if (!changes.hasOwnProperty(changedObjectKey)) {
            continue;
          }

          changedObject = changes[changedObjectKey];
          changedObjectIndex = this.getCachedRecordIndex(changedObjectKey);
          objectExists = changedObjectIndex !== -1;

          // Add/Update Object operation
          if (typeof changedObject.newValue !== "undefined") {
            // Don't cache records when objects do not contain primaryKeys
            if (!this.hasPrimaryKey(changedObject.newValue)) {
              continue;
            }

            objectExists
              ? (this.records[changedObjectIndex] =
                  changedObject.newValue) /* Update existing object (Edit) */
              : this.records.push(
                  changedObject.newValue
                ); /* Create New Object */
          }

          // Delete Rule Operation
          if (
            typeof changedObject.oldValue !== "undefined" &&
            typeof changedObject.newValue === "undefined" &&
            objectExists
          ) {
            this.records.splice(changedObjectIndex, 1);
          }
        }
      }
    }

    printRecords() {
      this.DB.get(null, function (o) {
        console.log(o);
      });
    }

    clearDB() {
      this.DB.clear();
    }

    switchStorageType(newStorageType) {
      if (chrome.storage[newStorageType] === this.DB) {
        Logger.log("Already on the same storage type. Doing nothing!");
        return;
      }

      Logger.log("Changing default storageType to", newStorageType);

      const existingStorage = this.DB;

      this.DB = chrome.storage[newStorageType];

      // Clear the existing records
      this.records.length = 0;

      const self = this;
      existingStorage.get(null, (superObject) => {
        const keysToRemove = [];
        for (let key in superObject) {
          if (
            superObject.hasOwnProperty(key) &&
            self.hasPrimaryKey(superObject[key])
          ) {
            // Save data in the new Storage
            chrome.storage[newStorageType].set({ [key]: superObject[key] });
            keysToRemove.push(key);
          }
        }

        // Remove records from existing storage
        existingStorage.remove(keysToRemove);
      });
    }
  };
})(window);

RQ.SessionRecorder = {
  isRecording: false,
  sendResponseCallbacks: {},
};

RQ.SessionRecorder.setup = () => {
  chrome.runtime.sendMessage(
    {
      action: RQ.CLIENT_MESSAGES.GET_SESSION_RECORDING_CONFIG,
    },
    (sessionRecordingConfig) => {
      if (sessionRecordingConfig) {
        const isIFrame = RQ.SessionRecorder.isIframe();

        if (!isIFrame) {
          RQ.SessionRecorder.addListeners();
        }

        RQ.ClientUtils.addRemoteJS(
          chrome.runtime.getURL("libs/requestly-web-sdk.js"),
          () => {
            RQ.ClientUtils.executeJS(
              `(${RQ.SessionRecorder.bootstrapClient.toString()})('${
                RQ.PUBLIC_NAMESPACE
              }')`
            );
            RQ.SessionRecorder.sendMessageToClient("startRecording", {
              relayEventsToTop: isIFrame,
              console: true,
              network: true,
              maxDuration:
                (sessionRecordingConfig.maxDuration || 5) * 60 * 1000, // minutes -> milliseconds
            });
          }
        );
      }
    }
  );
};

RQ.SessionRecorder.isIframe = () => {
  return window.top !== window;
};

RQ.SessionRecorder.addListeners = () => {
  chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    switch (message.action) {
      case RQ.CLIENT_MESSAGES.IS_RECORDING_SESSION:
        sendResponse(RQ.SessionRecorder.isRecording);
        break;

      case RQ.CLIENT_MESSAGES.GET_TAB_SESSION:
        if (RQ.SessionRecorder.isRecording) {
          RQ.SessionRecorder.sendMessageToClient(
            "getSessionData",
            null,
            sendResponse
          );
        }
        return true; // notify sender to wait for response and not resolve request immediately
    }
  });

  window.addEventListener("message", function (event) {
    if (event.source !== window || event.data.source !== "requestly:client") {
      return;
    }

    if (event.data.response) {
      RQ.SessionRecorder.sendResponseToRuntime(
        event.data.action,
        event.data.payload
      );
    } else if (event.data.action === "sessionRecordingStarted") {
      RQ.SessionRecorder.isRecording = true;
      chrome.runtime.sendMessage({
        action: RQ.CLIENT_MESSAGES.NOTIFY_SESSION_RECORDING_STARTED,
      });
    }
  });
};

RQ.SessionRecorder.sendResponseToRuntime = (action, payload) => {
  RQ.SessionRecorder.sendResponseCallbacks[action]?.(payload);
  delete RQ.SessionRecorder.sendResponseCallbacks[action];
};

RQ.SessionRecorder.sendMessageToClient = (
  action,
  payload,
  sendResponseCallback
) => {
  window.postMessage(
    { source: "requestly:extension", action, payload },
    window.location.href
  );
  if (sendResponseCallback) {
    RQ.SessionRecorder.sendResponseCallbacks[action] = sendResponseCallback;
  }
};

/**
 * Do not refer other function/variables from this function.
 * This function will be injected in website and will run in a different JS context.
 */
RQ.SessionRecorder.bootstrapClient = (namespace) => {
  window[namespace] = window[namespace] || {};

  const sendMessageToExtension = (action, payload) => {
    window.postMessage(
      { source: "requestly:client", action, payload },
      window.location.href
    );
  };

  const sendResponseToExtension = (action, payload) => {
    window.postMessage(
      { source: "requestly:client", response: true, action, payload },
      window.location.href
    );
  };

  window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (
      event.source !== window ||
      event.data.source !== "requestly:extension"
    ) {
      return;
    }

    if (event.data.action === "startRecording") {
      window[namespace].sessionRecorder = new Requestly.SessionRecorder(
        event.data.payload
      );
      window[namespace].sessionRecorder.start();
      sendMessageToExtension("sessionRecordingStarted");
    } else if (event.data.action === "getSessionData") {
      sendResponseToExtension(
        event.data.action,
        window[namespace].sessionRecorder.getSession()
      );
    }
  });
};

const extID = chrome.runtime.id;
const extVersion = chrome.runtime.getManifest()["version"];

// Add extensionID to localStorage so that page script can read and send message to it
window.localStorage.setItem("extID", extID);

document.documentElement.setAttribute("rq-ext-version", extVersion);

RQ.Utils.submitAttr("ext_id", extID);
RQ.Utils.submitAttr("ext_version", extVersion);
RQ.Utils.submitAttr(
  "last_activity",
  RQ.Utils.formatDate(Date.now(), "yyyy-mm-dd")
);

RQ.SessionRecorder.setup();
