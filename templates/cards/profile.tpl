<div class="profile-card" data-username="{username}" data-uid="{uid}">
    <div class="profile-card-cover-container mb-2">
        <div class="profile-card-cover rounded-top" style="background-image: url({cover:url}); background-position: {cover:position};">
            <div class="profile-card-avatar">
                <a href="{config.relative_path}/user/{userslug}">
                    {buildAvatar(@value, "50px", true)}
                </a>
            </div>
            <div class="dropdown card-fab">
                <button type="button" class="btn btn-light btn-sm rounded-circle fab dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-ellipsis-v"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-1">
                    <!-- IF !isSelf -->
                    <!-- IF !config.disableChat -->
                    <!-- IF hasPrivateChat -->
                    <li>
                        <a class="dropdown-item rounded-1" component="account/chat" href="#">[[user:chat_with, {username}]]</a>
                    </li>
                    <li class="dropdown-divider"></li>
                    <!-- ENDIF hasPrivateChat -->
                    <!-- ENDIF !config.disableChat -->
                    <!-- ENDIF !isSelf -->
                    <li>
                        <a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}" class="inline-block" id="profile">[[user:profile]]</a>
                    </li>

                    <li class="dropdown-divider"></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/following">[[user:following]]</a></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/followers">[[user:followers]]</a></li>
                    <li class="dropdown-divider"></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/topics">[[global:topics]]</a></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/posts">[[global:posts]]</a></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/groups">[[global:header.groups]]</a></li>

                    <!-- BEGIN profile_links -->
                    <li class="dropdown-divider"></li>
                    <li id="{profile_links.id}" class="plugin-link <!-- IF profile_links.public -->public<!-- ELSE -->private<!-- ENDIF profile_links.public -->"><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/{profile_links.route}"><i class="fa fa-fw {profile_links.icon}"></i> {profile_links.name}</a></li>
                    <!-- END profile_links -->
                </ul>
            </div>
        </div>
    </div>

    <div class="profile-card-info">
        <h1 class="fullname"><!-- IF fullname -->{fullname}<!-- ELSE -->{username}<!-- ENDIF fullname --></h1>

        <div class="text-center">
            <!-- IF !isSelf -->
            <a component="account/follow" href="#" class="btn btn-success btn-sm <!-- IF isFollowing -->hide<!-- ENDIF isFollowing -->">[[user:follow]]</a>
            <a component="account/unfollow" href="#" class="btn btn-warning btn-sm <!-- IF !isFollowing -->hide<!-- ENDIF !isFollowing -->">[[user:unfollow]]</a>
            <!-- IF !config.disableChat -->
            <a component="account/chat" href="#" class="btn btn-primary btn-sm">[[user:chat]]</a>
            <!-- ENDIF !config.disableChat -->
            <!-- ENDIF !isSelf -->
        </div>

        <!-- IF aboutme -->
        <div class="line-clamp-6 text-center">
            <span class="aboutme">{aboutme}</span>
        </div>
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
                <div class="human-readable-number" title="{followerCount}">{followerCount}</div>
                <span class="stat-label">[[user:followers]]</span>
            </div>
        </div>

        <div class="text-center profile-meta">
            <!-- IF email -->
            <span><i class="fa fa-envelope-open-o" aria-hidden="true"></i></span>
            <strong><i class="fa fa-eye-slash {emailClass}" title="[[user:email_hidden]]"></i> {email}</strong>
            <br/>
            <!-- ENDIF email -->

            <!-- IF websiteName -->
            <span><i class="fa fa-edge" aria-hidden="true"></i></span>
            <strong><a href="{websiteLink}" target="_blank" rel="nofollow">{websiteName}</a></strong>
            <br/>
            <!-- ENDIF websiteName -->

            <!-- IF location -->
            <span><i class="fa fa-location-arrow" aria-hidden="true"></i></span>
            <strong>{location}</strong>
            <br/>
            <!-- ENDIF location -->
        </div>
    </div>
</div>
