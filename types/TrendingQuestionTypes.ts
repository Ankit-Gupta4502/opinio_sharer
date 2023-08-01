

 interface Main {
    address:            Address;
    choices:            Choice[];
    comment_count:      number;
    created_at:         string;
    days_left:          number;
    dynamic_link:       DynamicLink;
    end_date:           null;
    hashtag_list:       string[];
    is_expiry:          boolean;
    loc:                LOC;
    question_colour:    string[];
    question_id:        string;
    question_is_follow: boolean;
    question_slug:      string;
    title:              string;
    topic_id:           string;
    topic_title:        string;
    updated_at:         string;
    user_id:            string;
    users_details:      UsersDetails;
    view_count:         number;
    vote_count:         number;
    vote_country:       string[];
}

export interface Address {
    city:    string;
    country: Country;
    state:   null;
}

export enum Country {
    Australia = "Australia",
    India = "India",
    UnitedStates = "United States",
}

export interface Choice {
    choice_title: string;
    colour:       string;
    created_at:   string;
    id:           string;
    vote_count:   number;
}

export interface DynamicLink {
    graph:    string;
    question: string;
    vote:     string;
}

export interface LOC {
    coordinates: number[];
    type:        Type;
}

export enum Type {
    Point = "Point",
}

export interface UsersDetails {
    colour:          string;
    first_name:      string;
    followers_count: number;
    id:              string;
    image_url:       string;
    last_name:       string;
    username:        string;
}

export default Main