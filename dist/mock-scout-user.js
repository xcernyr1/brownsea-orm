"use strict";
var Chance = require('chance');
var chance = new Chance();
function MockUser(roles) {
    if (roles === void 0) { roles = { "2": "authenticated user" }; }
    var _a = { firstName: chance.first(), lastName: chance.last(), email: chance.email() }, firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
    return JSON.stringify({
        "sessid": "09CxyC7w5YPi8LSbaRy-TxGn89Uaani27WgNVgMVm6A",
        "session_name": "SESS8aab09ea49f85a1307760629d6202c53",
        "user": {
            "uid": "448936",
            "name": firstName + " " + lastName,
            "mail": email,
            "theme": "",
            "signature": "",
            "signature_format": "plain_text",
            "created": "1473221927",
            "access": "1473306453",
            "login": "1473300420",
            "status": "1",
            "timezone": "",
            "language": "en",
            "picture": "0",
            "data": {
                "l10n_client_disabled": false,
                "mimemail_textonly": 0
            },
            "roles": roles,
            "field_user_country": {
                "und": [
                    {
                        "tid": "77"
                    }
                ]
            },
            "field_user_nso": [],
            "field_user_languages": [],
            "field_user_cover_img": [],
            "field_user_location": [],
            "field_user_about": [],
            "field_user_profile_img": [],
            "field_user_newsletter": {
                "und": [
                    {
                        "value": "1"
                    }
                ]
            },
            "field_user_scouting_interests": [],
            "field_user_scouting_history": [],
            "field_first_name": {
                "und": [
                    {
                        "value": firstName,
                        "format": null,
                        "safe_value": firstName
                    }
                ]
            },
            "field_last_name": {
                "und": [
                    {
                        "value": lastName,
                        "format": null,
                        "safe_value": lastName
                    }
                ]
            },
            "field_national_assoc": [],
            "field_other_national_scout_assoc": []
        }
    });
}
exports.MockUser = MockUser;
//# sourceMappingURL=mock-scout-user.js.map