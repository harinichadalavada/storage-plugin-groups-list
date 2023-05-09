// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
import { sortAscending, sortDescending } from "./sortUtils"

/*
  Process a mirage js collection according to API spec
  @params
  schema : mirage js schema object
  request : mirage js request object
  collectionName : string to identify mirage js collection, i.e. 'audits'

  @returns
  an object that adheres to standard API spec for collection responses
  i.e. { items: [obj], pageOffset, pageLimit, total }
*/
export function processCollectionRequest(schema, request, collectionName) {
  const { limit = 6, offset = 0, sort = "name", filter } = request.queryParams

  let processedCollection = schema[collectionName].all()

  // handle filter query strings
  if (filter) {
    const filterExpressions = filter.replace(/^"(.+(?="$))"$/, "$1").split(" and ")

    filterExpressions.forEach(filterString => {
      const { property, operation, value } = parseFilterParams(filterString)
      switch (operation) {
        case "eq":
          processedCollection = processedCollection.filter(item => item[property] === value)
          break
        case "gt": {
          processedCollection = processedCollection.filter(item => {
            let compareValue = checkForInstanceofDate(item[property], value)
            return item[property] > compareValue
          })
          break
        }
        case "lt": {
          processedCollection = processedCollection.filter(item => {
            let compareValue = checkForInstanceofDate(item[property], value)
            return item[property] < compareValue
          })
          break
        }
        case "in": {
          processedCollection = processedCollection.filter(item => value.includes(item[property]))
          break
        }
        case "contains": {
          processedCollection = processedCollection.filter(item => {
            return item[property].toLowerCase().includes(value.toLowerCase())
          })
          break
        }
        case "startswith": {
          processedCollection = processedCollection.filter(item => item[property].startsWith(value))
          break
        }
        default:
          console.error("Invalid filter applied:", filter)
      }
    })
  }
  const numHits = processedCollection.length

  // handle sorting requests
  if (sort !== "") {
    const sortfieldArr = sort.split(" ")
    const sortby = sortfieldArr[0] || ""
    const orderby = sortfieldArr.length === 2 ? sortfieldArr[1] : sortfieldArr[0] === "name" ? "asc" : "desc"
    processedCollection = processedCollection.sort((a, b) => {
      if (orderby === "desc") {
        return sortDescending(a[sortby], b[sortby])
      } else {
        return sortAscending(a[sortby], b[sortby])
      }
    })
  }

  // handle paging and offset
  processedCollection = processedCollection.slice(Number(offset), Number(offset) + Number(limit))

  const response = {
    items: processedCollection.models,
    pageLimit: Number(limit),
    pageOffset: Number(offset),
    total: numHits,
  }
  return response
}

function checkForInstanceofDate(item, value) {
  if (item instanceof Date) {
    return new Date(value)
  }
  return value
}

function parseFilterParams(filterString) {
  const paramArray = filterString.split(" ")
  const isInOperation = paramArray[1] === "in"

  const params = {
    property: isInOperation ? paramArray[2] : paramArray[0],
    operation: paramArray[1],
    value: isInOperation ? paramArray[0].split(",") : paramArray[2],
  }

  return params
}
