export const validame = (type, value) => {
  switch (type) {
    case "name":
    case "nombre":
    case "surname":
    case "cognom":
      if (value.length < 3) {
        return "Please, the name must be at least three characters long."
      }
      return ""

    case "email":
    case "e-mail":
    case "correo":
    case "mail":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

      if (!emailRegex.test(value)) {
        return "Please, the email format must be correct."
      }

      return ""

    case "password":
    case "contraseña":
      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/
      // if (!passwordRegex.test(value)) {
      //   return "El password debe tener 8 caracteres, simbolo y mayúscula"
      // }
      if (value.length < 6 || value.length > 10) {
        return "The password must be between 6 and 10 characters."
      }

      return ""
    default:
      console.log("whattttttttttt???")
  }
}

export const formatDate = (inputDate) => {
  // const inputDate = "2024-05-01T17:00:00.000Z";
  const dateObject = new Date(inputDate)

  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, "0")
  const day = String(dateObject.getDate()).padStart(2, "0")
  const hours = String(dateObject.getHours()).padStart(2, "0")
  const minutes = String(dateObject.getMinutes()).padStart(2, "0")

  const outputDate = `${year}-${month}-${day}T${hours}:${minutes}`
  return outputDate
}
export const calulateAge = (birthday) => {
  const birthYear = new Date(birthday).getFullYear()
  const currentYear = new Date().getFullYear()
  const age = Math.abs(currentYear - birthYear)
  return age
}

export const calculateProgress = (objcetToArray) => {
  if (!objcetToArray) {
    console.log("not load")
  } else {
    console.log("loading")
    let arrayPercentage = Object?.values(objcetToArray)
    let value = 0
    for (let i = 10; i < 15; i++) {
      if (arrayPercentage[i] !== "") {
        value = value + 16.66
      }
    }
    if (arrayPercentage[1] !== "") {
      value = value + 16.66
    }
    value = Math.round(value)
    return value
  }
}

export const formatDateToHumansWay = (dateString) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const date = new Date(dateString)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  // Add the ordinal suffix for the day
  const suffixes = ["th", "st", "nd", "rd"]
  const suffix = day % 10 < 4 ? suffixes[day % 10] : suffixes[0]

  return `${day}${suffix} ${months[monthIndex]} ${year}`
}
