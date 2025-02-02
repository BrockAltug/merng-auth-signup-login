import { gql } from '@apollo/client';

// Query to get a user by username
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

// Query to get the logged-in user's data
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;