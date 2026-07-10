<div class="profile-card" data-username="{username}" data-uid="{uid}">
    <div class="profile-card-cover-container mb-2">
        <div class="profile-card-cover rounded-top" style="background-image: url({cover:url}); background-position: {cover:position};">
            <div class="profile-card-avatar">
                <a href="{config.relative_path}/user/{userslug}">
                    {{buildAvatar(@value, "50px", true)}}
                </a>
            </div>
            <div class="dropdown card-fab">
                <button type="button" class="btn btn-light btn-sm rounded-circle dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa-solid fa-ellipsis-vertical fa-width-auto"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end p-1">
                    {{{ if (!isSelf && (!config.disableChat && hasPrivateChat)) }}}
                    <li>
                        <a class="dropdown-item rounded-1" component="account/chat" href="#">{{tx("user:chat-with", txEscape(username))}}</a>
                    </li>
                    <li class="dropdown-divider"></li>
                    {{{ end }}}
                    <li>
                        <a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}" class="inline-block" id="profile">{{tx("user:profile")}}</a>
                    </li>

                    <li class="dropdown-divider"></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/following">{{tx("user:following")}}</a></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/followers">{{tx("user:followers")}}</a></li>
                    <li class="dropdown-divider"></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/topics">{{tx("global:topics")}}</a></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/posts">{{tx("global:posts")}}</a></li>
                    <li><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/groups">{{tx("global:header.groups")}}</a></li>

                    {{{ each profile_links }}}
                    {{{ if (./id == "info")}}}
                    <li class="dropdown-divider"></li>
                    <li id="{./id}" class="plugin-link {{{ if ./public }}}public{{{ else }}}private{{{ end }}}"><a class="dropdown-item rounded-1" href="{config.relative_path}/user/{userslug}/{./route}"><i class="fa fa-fw {./icon}"></i> {{tx(./name)}}</a></li>
                    {{{ end }}}
                    {{{ end }}}
                </ul>
            </div>
        </div>
    </div>

    <div class="profile-card-info">
        <h1 class="fullname">{{{ if fullname }}}{fullname}{{{ else }}}{username}{{{ end }}}</h1>

        <div class="text-center mb-2">
            {{{ if !isSelf }}}
            <a component="account/follow" href="#" class="btn btn-success btn-sm {{{ if isFollowing }}}hide{{{ end }}}">{{tx("user:follow")}}</a>
            <a component="account/unfollow" href="#" class="btn btn-warning btn-sm {{{ if !isFollowing }}}hide{{{ end }}}">{{tx("user:unfollow")}}</a>
            {{{ if !config.disableChat }}}
            <a component="account/chat" href="#" class="btn btn-primary btn-sm">{{tx("user:chat")}}</a>
            {{{ end }}}
            {{{ end }}}
        </div>

        {{{ if aboutme }}}
        <div class="line-clamp-6 text-center">
            <span class="aboutme">{aboutme}</span>
        </div>
        {{{ end }}}

        <div class="account-stats">
            <div class="stat">
                <div class="human-readable-number" title="{reputation}">{reputation}</div>
                <span class="stat-label">{{tx("global:reputation")}}</span>
            </div>

            <div class="stat">
                <div class="human-readable-number" title="{postcount}">{postcount}</div>
                <span class="stat-label">{{tx("global:posts")}}</span>
            </div>

            <div class="stat">
                <div class="human-readable-number" title="{followerCount}">{followerCount}</div>
                <span class="stat-label">{{tx("user:followers")}}</span>
            </div>
        </div>

        <div class="text-center profile-meta d-flex flex-column gap-1">
            {{{ if email }}}
            <div>
                <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                <strong><i class="fa fa-eye-slash {emailClass}" title="{{tx("user:email-hidden")}}"></i> {email}</strong>
            </div>
            {{{ end }}}

            {{{ if websiteName }}}
            <div>
                <i class="fa fa-edge" aria-hidden="true"></i>
                <strong><a href="{websiteLink}" target="_blank" rel="nofollow">{websiteName}</a></strong>
            </div>
            {{{ end }}}

            {{{ if location }}}
            <div>
                <i class="fa fa-location-arrow" aria-hidden="true"></i>
                <strong>{location}</strong>
            </div>
            {{{ end }}}
        </div>
    </div>
</div>
