/*
 * Copyright (c) 2015, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function onRequest(context) {
    // var log = new Log("units/appbar/appbar.js");
    var userModule = require("/modules/user.js").userModule;
    var uiPermissions = userModule.getUIPermissions();
    context["permissions"] = uiPermissions;

    var links = {
        "users": [],
        "policies": [],
        "device-mgt": []
    };

    var backToDashboardLink = {
        "title": "Back to Dashboard",
        "icon": "fw-left-arrow",
        "url": "/mdm"
    };

    if (uiPermissions["VIEW_DASHBOARD"]) {
        links["users"].push(backToDashboardLink);
        links["policies"].push(backToDashboardLink);
        links["device-mgt"].push(backToDashboardLink);
    }

    if (uiPermissions["ADD_USER"]) {
        links["users"].push({
            "title": "Add User",
            "icon": "fw-add",
            "url": "/mdm/users/add-user"
        });
    }

    if (uiPermissions["ADD_POLICY"]) {
        links["policies"].push({
            "title": "Add Policy",
            "icon": "fw-add",
            "url": "/mdm/policies/add-policy"
        });
    }

    // following context.link value comes here based on the value passed at the point
    // where units are attached to a page zone.
    // eg: {{unit "appbar" link="users" title="User Management"}}
    context["currentActions"] = links[context["link"]];

    return context;
}