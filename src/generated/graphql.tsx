import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  removeFinished: Scalars['Float'];
  updateReminder: ReminderResponse;
  removeReminder: BooleanResponse;
};


export type MutationLoginArgs = {
  slackId: Scalars['String'];
};


export type MutationUpdateReminderArgs = {
  reminder: ReminderUpdateInput;
};


export type MutationRemoveReminderArgs = {
  reminder: ReminderDeletionInput;
};

export type Query = {
  __typename?: 'Query';
  me: UserResponse;
  allReminders: Array<Reminder>;
  myReminders: Array<Reminder>;
};

export type Reminder = {
  __typename?: 'Reminder';
  id: Scalars['String'];
  permalink: Scalars['String'];
  postAt: Scalars['Int'];
  authorName: Scalars['String'];
  channelName: Scalars['String'];
};

export type ReminderDeletionInput = {
  id: Scalars['String'];
};

export type ReminderResponse = {
  __typename?: 'ReminderResponse';
  reminder?: Maybe<Reminder>;
  errors?: Maybe<Array<FieldError>>;
};

export type ReminderUpdateInput = {
  id: Scalars['String'];
  postAt: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  slackId?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  slackId: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'slackId'>
  ) }
);

export type MyRemindersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRemindersQuery = (
  { __typename?: 'Query' }
  & { myReminders: Array<(
    { __typename?: 'Reminder' }
    & Pick<Reminder, 'id' | 'permalink' | 'postAt' | 'authorName' | 'channelName'>
  )> }
);

export type RemoveReminderMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveReminderMutation = (
  { __typename?: 'Mutation' }
  & { removeReminder: (
    { __typename?: 'BooleanResponse' }
    & Pick<BooleanResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )>> }
  ) }
);

export type UpdateReminderMutationVariables = Exact<{
  id: Scalars['String'];
  postAt: Scalars['Int'];
}>;


export type UpdateReminderMutation = (
  { __typename?: 'Mutation' }
  & { updateReminder: (
    { __typename?: 'ReminderResponse' }
    & { reminder?: Maybe<(
      { __typename?: 'Reminder' }
      & Pick<Reminder, 'id' | 'permalink' | 'postAt' | 'authorName' | 'channelName'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )>> }
  ) }
);


export const LoginDocument = gql`
    mutation Login($slackId: String!) {
  login(slackId: $slackId)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      slackId: // value for 'slackId'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    slackId
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyRemindersDocument = gql`
    query MyReminders {
  myReminders {
    id
    permalink
    postAt
    authorName
    channelName
  }
}
    `;

/**
 * __useMyRemindersQuery__
 *
 * To run a query within a React component, call `useMyRemindersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRemindersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRemindersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRemindersQuery(baseOptions?: Apollo.QueryHookOptions<MyRemindersQuery, MyRemindersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyRemindersQuery, MyRemindersQueryVariables>(MyRemindersDocument, options);
      }
export function useMyRemindersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyRemindersQuery, MyRemindersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyRemindersQuery, MyRemindersQueryVariables>(MyRemindersDocument, options);
        }
export type MyRemindersQueryHookResult = ReturnType<typeof useMyRemindersQuery>;
export type MyRemindersLazyQueryHookResult = ReturnType<typeof useMyRemindersLazyQuery>;
export type MyRemindersQueryResult = Apollo.QueryResult<MyRemindersQuery, MyRemindersQueryVariables>;
export const RemoveReminderDocument = gql`
    mutation RemoveReminder($id: String!) {
  removeReminder(reminder: {id: $id}) {
    success
    errors {
      path
      message
    }
  }
}
    `;
export type RemoveReminderMutationFn = Apollo.MutationFunction<RemoveReminderMutation, RemoveReminderMutationVariables>;

/**
 * __useRemoveReminderMutation__
 *
 * To run a mutation, you first call `useRemoveReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReminderMutation, { data, loading, error }] = useRemoveReminderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveReminderMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReminderMutation, RemoveReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReminderMutation, RemoveReminderMutationVariables>(RemoveReminderDocument, options);
      }
export type RemoveReminderMutationHookResult = ReturnType<typeof useRemoveReminderMutation>;
export type RemoveReminderMutationResult = Apollo.MutationResult<RemoveReminderMutation>;
export type RemoveReminderMutationOptions = Apollo.BaseMutationOptions<RemoveReminderMutation, RemoveReminderMutationVariables>;
export const UpdateReminderDocument = gql`
    mutation UpdateReminder($id: String!, $postAt: Int!) {
  updateReminder(reminder: {id: $id, postAt: $postAt}) {
    reminder {
      id
      permalink
      postAt
      authorName
      channelName
    }
    errors {
      path
      message
    }
  }
}
    `;
export type UpdateReminderMutationFn = Apollo.MutationFunction<UpdateReminderMutation, UpdateReminderMutationVariables>;

/**
 * __useUpdateReminderMutation__
 *
 * To run a mutation, you first call `useUpdateReminderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReminderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReminderMutation, { data, loading, error }] = useUpdateReminderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      postAt: // value for 'postAt'
 *   },
 * });
 */
export function useUpdateReminderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReminderMutation, UpdateReminderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReminderMutation, UpdateReminderMutationVariables>(UpdateReminderDocument, options);
      }
export type UpdateReminderMutationHookResult = ReturnType<typeof useUpdateReminderMutation>;
export type UpdateReminderMutationResult = Apollo.MutationResult<UpdateReminderMutation>;
export type UpdateReminderMutationOptions = Apollo.BaseMutationOptions<UpdateReminderMutation, UpdateReminderMutationVariables>;