<div class="profile-card" data-username="{username}" data-uid="{uid}">
    <div class="profile-card-img-container">
        <a href="/user/{userslug}"><img src="{picture}" /></a>
    </div>

    <ul class="profile-card-stats">
        <li title="Reputation"><i class="fa fa-star"></i><span title="{reputation}"></span></li>
        <li title="Posts"><i class="fa fa-pencil"></i><span title="{postcount}"></span></li>
        <li title="Followers"><i class="fa fa-users"></i><span title="{followerCount}"></span></li>
        <li title="Profile views"><i class="fa fa-eye"></i><span title="{profileviews}"></span></li>
    </ul>

    <div class="profile-card-main">
        <h4>{name}</h4>

        <ul>
            <li><i title="{statusTitle}" class="account-online-status fa fa-circle status {status}"></i></li>
            <li><a class="profile-card-chat" href="#"><i class="fa fa-comment-o"></i></a></li>
        </ul>
    </div>
</div>