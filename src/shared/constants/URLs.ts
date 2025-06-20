const URLs = {
  HR: {
    LOOKUPS: (type: string) => `lookups?type=${type}`,
  },
  LEAVE: {
    LOOKUPS: (type: string) => `leaveLookups/${type}`,
  },
  IBTIKAR: {
    APPEAL: () => `ibtikar/appeal`,
    SUBMISSION: () => `ibtikar/suggestion`,
    GET_LIST: (username: string) => ``,
    GET_USERS: (term: string) => `ibtikar/employees/${term}`,
    GET_CAMPAIGNS: () => `https://ibtikar.azurewebsites.net/api/campaigns`,
    GET_MY_SUGESSTIONS: () => `ibtikar/suggestions`,
    GET_CATEGORIES: () => `ibtikar/categories`,
    GET_SUGESSTION_BY_ID: (id: string) => `ibtikar/suggestion/${id}`,
    GET_SUGESSTION_LOGS_BY_ID: (id: number) => `ibtikar/suggestion/logs/${id}`,
    GET_TOKEN: () => `ibtikar/token/`,
    GET_ATTACHEMNT_PREVIEW: (id: any) => `ibtikar/preview/${id}`,
    FILE_UPLOAD: () => `ibtikar/file`,
  },
  LOOKUPS: {
    GET_LIST: () => `/lookups`,
  },
  AUTH: {
    LOGIN: () => `/auth/login`,
    LOGOUT: () => `/auth/logout`,
    REGISTER: () => `/auth/register`,
  },

};

export default URLs;