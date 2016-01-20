<div class="profile-card" data-username="{username}" data-uid="{uid}">
    <a class="profile-card-img-container" href="/user/{userslug}">
        <!-- IF picture -->
        <img class="user-img" title="{username}" src="{picture}"/>
        <!-- ELSE -->
        <div class="user-icon" title="{username}" style="background-color: {icon:bgColor};">{icon:text}</div>
        <!-- ENDIF picture -->
    </a>

    <ul class="profile-card-stats">
        <li title="[[global:reputation]]"><i class="fa fa-star"></i><span title="{reputation}"></span></li>
        <li title="[[global:posts]]"><i class="fa fa-pencil"></i><span title="{postcount}"></span></li>
        <li title="[[user:followers]]"><i class="fa fa-users"></i><span title="{followerCount}"></span></li>
        <li title="[[user:profile_views]]"><i class="fa fa-eye"></i><span title="{profileviews}"></span></li>
    </ul>

    <div class="profile-card-main">
        <h4>{name}</h4>

        <ul>
            <li><i title="[[global:{status}]]" class="account-online-status fa fa-circle status {status}"></i></li>
            <!-- IF !config.disableChat --><li><a class="profile-card-chat" href="#"><i class="fa fa-comment-o"></i></a></li><!-- ENDIF !config.disableChat -->
        </ul>
    </div>
</div>