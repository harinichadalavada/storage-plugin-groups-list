// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
function generateErrorResponse(message) {
  return {
    status: "error",
    message,
    input: [],
  }
}

const apiVersion = "/api/v1"

class GroupsAPI {
  constructor() {}

  async get(basepath, pathName, params, token) {
    let url = `${basepath}${apiVersion}${pathName}`

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }

    if (params && Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString()
      url += `?${query}`
    }

    try {
      // console.log("URL:" + url)
      // console.log("Opts:" + JSON.stringify(options))
      var response = await fetch(url, options)

      if (response && ![200, 201, 202].includes(response.status)) {
        var error = await response.json()
        return generateErrorResponse(error.message || "Failed to fetch resource.")
      }
      // if response Content-Type is JSON, return object with response json body
      if (response.headers.get("Content-Type").includes("application/json")) {
        var result = await response.json()
        result.status = "success"
        return result
      }
      // otherwise return the response itself
      return response
    } catch (error) {
      return generateErrorResponse(error.message || "Failed to fetch resource.")
    }
  }
}

const instance = new GroupsAPI()

export default instance
