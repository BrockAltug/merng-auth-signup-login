// GraphQL API utility functions
const API_URL = "/graphql"

export async function graphqlRequest(query, variables = {}, token = null) {
  const headers = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const result = await response.json()

    if (result.errors) {
      throw new Error(result.errors[0].message)
    }

    return result.data
  } catch (error) {
    console.error("GraphQL request error:", error)
    throw error
  }
}

// Auth-related GraphQL queries and mutations
export const AUTH_QUERIES = {
  LOGIN: `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          username
          email
          isVerified
        }
      }
    }
  `,

  SIGNUP: `
    mutation AddUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password)
    }
  `,

  VERIFY_EMAIL: `
    mutation VerifyEmail($email: String!, $verificationCode: String!) {
      verifyEmail(email: $email, verificationCode: $verificationCode) {
        token
        user {
          _id
          username
          email
          isVerified
        }
      }
    }
  `,

  ME: `
    query Me {
      me {
        _id
        username
        email
        isVerified
      }
    }
  `,
}

// Auth helper functions
export function getStoredToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export function getStoredUser() {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function storeAuthData(token, user) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export function clearAuthData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}
