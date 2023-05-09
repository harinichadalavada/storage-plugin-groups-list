// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
function getControlForProp(prop, controlOptions) {
  let defaultVal = ""
  let control = {
    defaultValue: defaultVal,
    control: { type: "text" },
  }

  // control options have to be defined using camelCase
  const propCamel = prop.attribute
  const argsOption = controlOptions.args[propCamel] || controlOptions.args[prop.attribute]
  const argTypesOptions = controlOptions.argTypes[propCamel] || controlOptions.argTypes[prop.attribute]
  // if control options are defined, use those
  if (argTypesOptions) {
    control = argTypesOptions
  }
  // otherwise, implicitly create controls based on prop type or attribute name
  else if (/^(?:number|boolean|object)$/i.test(prop.type)) {
    control = { control: { type: prop.type.toLowerCase() } }
  } else if (/^(?:string)$/i.test(prop.type)) {
    if (!/^(?:string|number|boolean|object)$/i.test(prop.complexType.original)) {
      const arrOptions = prop.complexType.resolved.split(" | ")
      const selectOptions = arrOptions.map(o =>
        o.match(/("(\w|-)+")|('(\w|-)+')/g) ? o.replace(/'|\|/gi, "").replace(/"|\|/gi, "").replace(/'/gi, "").replace(/`/gi, "").trim() : o,
      )

      control = {
        control: {
          type: "select",
          options: selectOptions,
        },
      }
    } else if (prop.attribute.indexOf("color") !== -1) {
      control = {
        control: "color",
      }
    }
  } else if (prop.attribute.indexOf("date") !== -1) {
    control = {
      control: {
        type: "date",
      },
    }
    defaultVal = new Date()
  }

  if (argsOption) {
    defaultVal = argsOption
  } else if (prop.defaultValue) {
    try {
      defaultVal = prop.defaultValue

      if (typeof defaultVal === "string") {
        defaultVal = /('\w+')/g.test(defaultVal) || /('')/g.test(defaultVal) ? (/('')/g.test(defaultVal) ? "Example Label" : defaultVal.replace(/'/gi, "")) : JSON.parse(defaultVal)
      }
    } catch (e) {
      defaultVal = typeof prop.defaultValue === "string" ? prop.defaultValue : undefined
    }
  }
  let defaultControlVal = defaultVal
  if (defaultVal !== "") {
    defaultControlVal = { summary: defaultVal }
  }
  const description = prop?.docs?.text
  const requiredVal = { required: prop?.required }
  const tableType = {
    type: { summary: prop?.type },
  }
  return { default: defaultVal, control: { ...control, description: description, type: requiredVal, table: tableType, defaultValue: defaultControlVal } }
}

function getPropsWithControlValues(Component, controlOptions) {
  let controls = { args: {}, argTypes: {}, eventsEmitters: {} }
  Object.keys(Component.properties || {}).forEach(key => {
    const property = Component.properties[key]
    // normalize older "attr" into newer "attribute" property
    if (property.hasOwnProperty("attr")) {
      property.attribute = property.attr
    }

    if (property.hasOwnProperty("attribute")) {
      const control = getControlForProp(property, controlOptions)
      // key = key === "dataTestId" ? 'data-test-id' : key;
      key = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      controls = {
        args: { ...controls.args, [key]: control.default },
        argTypes: { ...controls.argTypes, [key]: control.control },
      }
    }
  })
  Object.keys(Component.events || {}).forEach(key => {
    const event = Component.events[key]
    if (event?.docs?.text) {
      const argTypesforEvent = {}
      argTypesforEvent[event.name] = {
        description: event.docs.text,
        summary: "EventEmitter",
      }
      controls = {
        args: { ...controls.args },
        argTypes: { ...controls.argTypes },
        eventsEmitters: { ...controls.eventsEmitters, ...argTypesforEvent },
      }
    }
  })
  return controls
}

export function generatePluginArgs({ Component, args = {}, argTypes = {} }) {
  return getPropsWithControlValues(Component, { args, argTypes })
}

function getComponentFromExport(_module) {
  const key = Object.keys(_module).find(exportKey => {
    const _export = _module[exportKey]
    // does it quack like a stencil class component?
    if (_export.prototype && _export.is && _export.encapsulation) {
      return true
    }
  })
  return _module[key]
}

export function buildPluginConfig(componentCtx) {
  const componentRoute = componentCtx.keys()
  return componentRoute.reduce((obj, compRoute) => {
    const _module = componentCtx(compRoute)
    const Component = getComponentFromExport(_module)

    if (!Component) {
      return obj
    }
    return Object.assign(obj, {
      [Component.name]: {
        Component,
      },
    })
  }, {})
}
