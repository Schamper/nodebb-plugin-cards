<div class="profile-card" data-username="{username}" data-uid="{uid}">
    <div class="profile-card-cover-container">
        <div class="profile-card-cover" style="background-image: url({cover:url}); background-position: {cover:position};">
            <div class="profile-card-avatar">
                <!-- IF picture -->
                <img class="avatar avatar-rounded" title="{username}" src="{picture}"/>
                <!-- ELSE -->
                <div class="avatar avatar-rounded" title="{username}" style="background-color: {icon:bgColor};">{icon:text}</div>
                <!-- ENDIF picture -->
                <i class="fa fa-circle status {status}" title="[[global:{status}]]"></i>
            </div>
            <div class="btn-group card-fab">
                <button type="button" class="fab dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-ellipsis-v"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                    <!-- IF !isSelf -->
                    <!-- IF !config.disableChat -->
                    <li>
                        <a component="account/chat" href="#">[[user:chat_with, {username}]]</a>
                    </li>
                    <li class="divider"></li>
                    <!-- ENDIF !config.disableChat -->
                    <!-- ENDIF !isSelf -->
                    <li>
                        <a href="{config.relative_path}/user/{userslug}" class="inline-block" id="profile">[[user:profile]]</a>
                    </li>

                    <!-- IF !isSelf -->
                    <!-- IF isAdmin -->
                    <li class="<!-- IF banned -->hide<!-- ENDIF banned -->">
                        <a component="account/ban" href="#">[[user:ban_account]]</a>
                    </li>
                    <li class="<!-- IF !banned -->hide<!-- ENDIF !banned -->">
                        <a component="account/unban" href="#">[[user:unban_account]]</a>
                    </li>
                    <li>
                        <a component="account/delete" href="#" class="">[[user:delete_account]]</a>
                    </li>
                    <!-- ENDIF isAdmin -->
                    <!-- ENDIF !isSelf -->

                    <li class="divider"></li>
                    <li><a href="{config.relative_path}/user/{userslug}/following">[[user:following]]</a></li>
                    <li><a href="{config.relative_path}/user/{userslug}/followers">[[user:followers]]</a></li>
                    <li class="divider"></li>
                    <li><a href="{config.relative_path}/user/{userslug}/topics">[[global:topics]]</a></li>
                    <li><a href="{config.relative_path}/user/{userslug}/posts">[[global:posts]]</a></li>
                    <li><a href="{config.relative_path}/user/{userslug}/groups">[[global:header.groups]]</a></li>

                    <!-- BEGIN profile_links -->
                    <li class="divider"></li>
                    <li id="{profile_links.id}" class="plugin-link <!-- IF profile_links.public -->public<!-- ELSE -->private<!-- ENDIF profile_links.public -->"><a href="{config.relative_path}/user/{userslug}/{profile_links.route}"><i class="fa fa-fw {profile_links.icon}"></i> {profile_links.name}</a></li>
                    <!-- END profile_links -->
                </ul>
            </div>
        </div>
    </div>

    <div class="profile-card-info">
        <h1 class="fullname"><!-- IF fullname -->{fullname}<!-- ELSE -->{username}<!-- ENDIF fullname --></h1>
        <h2 class="username"><!-- IF !banned -->@{username}<!-- ELSE -->[[user:banned]]<!-- ENDIF !banned --></h2>

        <!-- IF aboutme -->
        <span class="text-center aboutme">{aboutme}</span>
        <!-- ENDIF aboutme -->

        <div class="account-stats">
            <div class="stat">
                <div class="human-readable-number" title="{reputation}">{reputation}</div>
                <span class="stat-label">[[global:reputation]]</span>
            </div>

            <div class="stat">
                <div class="human-readable-number" title="{postcount}">{postcount}</div>
                <span class="stat-label">[[global:posts]]</span>
            </div>

            <div class="stat">
                <div class="human-readable-number" title="{profileviews}">{profileviews}</div>
                <span class="stat-label">views</span>
            </div>

            <div class="stat">
                <div class="human-readable-number" title="{followerCount}">{followerCount}</div>
                <span class="stat-label">[[user:followers]]</span>
            </div>
        </div>

        <div class="text-center profile-meta">
            <span>[[user:joined]]</span>
            <strong class="timeago" title="{joindateISO}"></strong><br />

            <span>[[user:lastonline]]</span>
            <strong class="timeago" title="{lastonlineISO}"></strong><br />

            <!-- IF email -->
            <span>[[user:email]]</span>
            <strong><i class="fa fa-eye-slash {emailClass}" title="[[user:email_hidden]]"></i> {email}</strong>
            <!-- ENDIF email -->

            <!-- IF websiteName -->
            <span>[[user:website]]</span>
            <strong><a href="{websiteLink}" rel="nofollow">{websiteName}</a></strong>
            <!-- ENDIF websiteName -->

            <!-- IF location -->
            <span>[[user:location]]</span>
            <strong>{location}</strong>
            <!-- ENDIF location -->

            <!-- IF age -->
            <span>[[user:age]]</span>
            <strong>{age}</strong>
            <!-- ENDIF age -->
        </div>
    </div>
</div>