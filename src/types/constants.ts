import keys from "../services/Keys";
import { InteractionTypesEnum, TargetStatusesEnum, OwnerStatusesEnum } from "./enums";

export const INTERACTIONTYPES_TO_TARGETSTATUS: { [key: InteractionTypesEnum]: TargetStatusesEnum } = {
    [InteractionTypesEnum.CONNECT_TO_TARGET]: TargetStatusesEnum.INTRO,
    [InteractionTypesEnum.GOOD_TO_GO]: TargetStatusesEnum.WE_ARE_GOOD_TO_GO,
    [InteractionTypesEnum.MY_PART_IS_DONE]: TargetStatusesEnum.MY_PART_IS_DONE,
    [InteractionTypesEnum.DONE_DEAL]: TargetStatusesEnum.DONE_DEAL,

}
export const INTERACTIONTYPES_TO_TARGETSTATUS_COLORS: { [key: InteractionTypesEnum]: string } = {
    [InteractionTypesEnum.CONNECT_TO_TARGET]: '#428CF0',
    [InteractionTypesEnum.GOOD_TO_GO]: '#428CF0',
    [InteractionTypesEnum.MY_PART_IS_DONE]: '#F49C05',
    [InteractionTypesEnum.DONE_DEAL]: '#13BB87',

}
// export const IDProperties = {
// 	[InteractionTypesEnum.FIRST_MESSAGE]: ['toUser'],
// 	[InteractionTypesEnum.SEND_MESSAGE]: ['toUser'],
// 	[InteractionTypesEnum.INTRODUCTION]: ['fromUser'],
// 	[InteractionTypesEnum.GOOD_TO_GO]: ['ownerUser', 'targetUser'],
// 	[InteractionTypesEnum.DONE_DEAL]: ['fromUser', 'toUser'],
// 	[InteractionTypesEnum.REJECTED_INVITE]: ['fromUser'],
// 	[InteractionTypesEnum.CONFIRMED_INVITE]: ['fromUser', 'toUser'],
// 	[InteractionTypesEnum.SEND_INVITE]: ['toUser']
// };

export const UNCLICKABLE_TARGET_STATUSES = [
    OwnerStatusesEnum.APPROVED,
    OwnerStatusesEnum.APPROVAL_PENDING,
    OwnerStatusesEnum.APPROVAL_DECLINED,
    TargetStatusesEnum.APPROVAL_PENDING,
    TargetStatusesEnum.APPROVAL_DECLINED,
    TargetStatusesEnum.APPROVED,
];
export const COUNT_PER_PAGE = 20;
export const OTHER_USER_SECTION_COUNT_PER_PAGE = 5;


export const AUTH_CONFIG = {
    issuer: keys.AUTH_API_URI,
    clientId: keys.AUTH_CLIENT_ID,
    clientSecret: keys.AUTH_CLIENT_SECRET,
    redirectUrl: 'com.crumbiz:/oauthredirect',
    scopes: ['openid', 'profile', 'email'],
    serviceConfiguration: {
        authorizationEndpoint: keys.AUTH_API_URI + "connect/authorize",
        tokenEndpoint: keys.AUTH_API_URI + "connect/token",
        revocationEndpoint: keys.AUTH_API_URI + "connect/revocation",
    },
    additionalParameters: {
        prompt: 'login'
      }
};
