import {IOtherUserProfile, IReduxAction} from '../../types/interfaces';
import {OtherUserProfileActionTypes} from '../constants';
import _ from 'lodash';

const initialState: IOtherUserProfile = {
    isLoading: false,
    profile: null,
    sections: [],
}

const otherUserProfileReducer = (
    state = initialState,
    action: IReduxAction<OtherUserProfileActionTypes>
) => {
    switch (action.type) {
        case OtherUserProfileActionTypes.GET_OTHER_USER_PROFILE: {
            return {...state, isLoading: true}
        }
        case OtherUserProfileActionTypes.SET_OTHER_USER_PROFILE: {
            return {
                ...state,
                profile: action.payload,
                isLoading: false
            };
        }
        case OtherUserProfileActionTypes.GET_OTHER_USER_PROFILE_SECTION: {
            const { sectionType } = action.payload;
            const sections = state.sections;

            const index = _.findIndex(sections, (s) => s.sectionType === sectionType);

            let newSectionsArray = [];

            // already exists
            if (index !== -1) {
                const oldSection = sections[index];
                newSectionsArray = [...sections];
                newSectionsArray.splice(index, 1, {
                    ...oldSection,
                    isLoading: true
                })

            } else {
                newSectionsArray = [...sections, {
                    items: [],
                    isLoading: true,
                    isPaginationLoading: false,
                    isEndReached: false,
                    sectionType: sectionType,
                    count: 0,
                }];
            }

            return {
                ...state,
                sections: newSectionsArray
            }
        }
        case OtherUserProfileActionTypes.SET_OTHER_USER_PROFILE_SECTION: {
            const { data, sectionType } = action.payload;
            const sections = state.sections;

            const index = _.findIndex(sections, (s) => s.sectionType === sectionType);

            const oldSection = sections[index];
            let newSectionsArray = [...sections];
            newSectionsArray.splice(index, 1, {
                ...oldSection,
                items: data.Data,
                isLoading: false,
                isPaginationLoading: false,
                isEndReached: data.Count <= data.Data.length,
                sectionType: sectionType,
                count: data.Count,
            })

            return {
                ...state,
                sections: newSectionsArray
            }
        }
        case OtherUserProfileActionTypes.GET_LOAD_MORE_OTHER_USER_PROFILE_SECTION: {
            const { sectionType } = action.payload;

            const sections = state.sections;

            const index = _.findIndex(sections, (s) => s.sectionType === sectionType);

            const oldSection = sections[index];
            let newSectionsArray = [...sections];
            newSectionsArray.splice(index, 1, {
                ...oldSection,
                isPaginationLoading: true,
            })

            return {
                ...state,
                sections: newSectionsArray
            }
        }
        case OtherUserProfileActionTypes.SET_LOAD_MORE_OTHER_USER_PROFILE_SECTION: {
            const { data, sectionType } = action.payload;
            const sections = state.sections;

            const index = _.findIndex(sections, (s) => s.sectionType === sectionType);

            const oldSection = sections[index];
            const newSectionItems = [...oldSection.items, ...data.Data];
            let newSectionsArray = [...sections];
            newSectionsArray.splice(index, 1, {
                ...oldSection,
                isPaginationLoading: false,
                items: newSectionItems,
                isEndReached: oldSection.count <= newSectionItems.length,
            })

            return {
                ...state,
                sections: newSectionsArray
            }
        }
        default:
            return state;
    }
};
export default otherUserProfileReducer;
