 interface Main {
    data:Data;
}

export interface Data {
    address:            Address;
    choices:            Choice[];
    comment_count:      number;
    comments_details:   any[];
    created_at:         string;
    days_left:          number;
    dynamic_link:       DynamicLink;
    end_date:           null;
    hashtags:           any[];
    loc:                LOC;
    question_colour:    string[];
    question_id:        string;
    question_is_follow: boolean;
    question_slug:      string;
    tagged_groups:      any[];
    tagged_users:       any[];
    title:              string;
    topic_id:           string;
    topic_is_follow:    boolean;
    topic_title:        string;
    updated_at:         string;
    user_id:            string;
    users_details:      UsersDetails;
    view_count:         number;
    vote_count:         number;
    vote_country:       string[];
    vote_history:       any[];
    voted_to:           null;
}

export interface Address {
    city:    string;
    country: string;
    state:   null;
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
    type:        string;
}

export interface UsersDetails {
    colour:          string;
    first_name:      string;
    followers_count: number;
    id:              string;
    image_url:       string;
    is_block:        boolean;
    is_follow:       boolean;
    last_name:       string;
    username:        string;
}
export default Main