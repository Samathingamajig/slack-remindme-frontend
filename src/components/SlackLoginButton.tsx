import React from 'react';

const SlackLoginButton: React.FC = () => (
    <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=1993542502418.1993779978259&team=T01V7FYESCA">
        <img
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
    </a>
);

export default SlackLoginButton;
