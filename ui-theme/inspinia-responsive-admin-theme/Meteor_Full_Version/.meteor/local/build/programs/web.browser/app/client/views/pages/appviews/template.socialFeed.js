(function(){
Template.__checkName("socialFeed");
Template["socialFeed"] = new Template("Template.socialFeed", (function() {
  var view = this;
  return [ HTML.Raw("<!-- Page heading -->\n    "), Blaze._TemplateWith(function() {
    return {
      title: Spacebars.call("Social feed"),
      category: Spacebars.call("App views")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("pageHeading"));
  }), "\n\n    ", HTML.DIV({
    "class": "wrapper wrapper-content  animated fadeInRight"
  }, "\n        ", HTML.DIV({
    "class": "row"
  }, "\n\n            ", HTML.DIV({
    "class": "col-lg-6"
  }, "\n                ", HTML.Raw('<div class="ibox">\n                    <div class="ibox-content text-center">\n\n                        <h3 class="m-b-xxs">Social feed style 1</h3>\n                        <small>News full block with incorporate avatar picture</small>\n\n                    </div>\n\n                </div>'), "\n\n                ", HTML.DIV({
    "class": "social-feed-box"
  }, "\n\n                    ", HTML.Raw('<div class="pull-right social-action dropdown">\n                        <button data-toggle="dropdown" class="dropdown-toggle btn-white">\n                            <i class="fa fa-angle-down"></i>\n                        </button>\n                        <ul class="dropdown-menu m-t-xs">\n                            <li><a href="#">Config</a></li>\n                        </ul>\n                    </div>'), "\n                    ", HTML.Raw('<div class="social-avatar">\n                        <a href="" class="pull-left">\n                            <img alt="image" src="img/a1.jpg">\n                        </a>\n                        <div class="media-body">\n                            <a href="#">\n                                Andrew Williams\n                            </a>\n                            <small class="text-muted">Today 4:21 pm - 12.06.2014</small>\n                        </div>\n                    </div>'), "\n                    ", HTML.Raw('<div class="social-body">\n                        <p>\n                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their\n                            default model text, and a search for \'lorem ipsum\' will uncover many web sites still\n                            in their infancy. Packages and web page editors now use Lorem Ipsum as their\n                            default model text.\n                        </p>\n\n                        <div class="btn-group">\n                            <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>\n                            <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>\n                            <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>\n                        </div>\n                    </div>'), "\n                    ", HTML.DIV({
    "class": "social-footer"
  }, "\n                        ", HTML.Raw('<div class="social-comment">\n                            <a href="" class="pull-left">\n                                <img alt="image" src="img/a1.jpg">\n                            </a>\n                            <div class="media-body">\n                                <a href="#">\n                                    Andrew Williams\n                                </a>\n                                Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words.\n                                <br>\n                                <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -\n                                <small class="text-muted">12.06.2014</small>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.Raw('<div class="social-comment">\n                            <a href="" class="pull-left">\n                                <img alt="image" src="img/a2.jpg">\n                            </a>\n                            <div class="media-body">\n                                <a href="#">\n                                    Andrew Williams\n                                </a>\n                                Making this the first true generator on the Internet. It uses a dictionary of.\n                                <br>\n                                <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -\n                                <small class="text-muted">10.07.2014</small>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.DIV({
    "class": "social-comment"
  }, "\n                            ", HTML.Raw('<a href="" class="pull-left">\n                                <img alt="image" src="img/a3.jpg">\n                            </a>'), "\n                            ", HTML.DIV({
    "class": "media-body"
  }, "\n                                ", HTML.TEXTAREA({
    "class": "form-control",
    placeholder: "Write comment..."
  }), "\n                            "), "\n                        "), "\n\n                    "), "\n\n                "), "\n\n                ", HTML.DIV({
    "class": "social-feed-box"
  }, "\n\n                    ", HTML.Raw('<div class="pull-right social-action dropdown">\n                        <button data-toggle="dropdown" class="dropdown-toggle btn-white">\n                            <i class="fa fa-angle-down"></i>\n                        </button>\n                        <ul class="dropdown-menu m-t-xs">\n                            <li><a href="#">Config</a></li>\n                        </ul>\n                    </div>'), "\n                    ", HTML.Raw('<div class="social-avatar">\n                        <a href="" class="pull-left">\n                            <img alt="image" src="img/a6.jpg">\n                        </a>\n                        <div class="media-body">\n                            <a href="#">\n                                Andrew Williams\n                            </a>\n                            <small class="text-muted">Today 4:21 pm - 12.06.2014</small>\n                        </div>\n                    </div>'), "\n                    ", HTML.Raw('<div class="social-body">\n                        <p>\n                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their\n                            default model text, and a search for \'lorem ipsum\' will uncover many web sites still\n                            in their infancy. Packages and web page editors now use Lorem Ipsum as their\n                            default model text.\n                        </p>\n                        <p>\n                            Lorem Ipsum as their\n                            default model text, and a search for \'lorem ipsum\' will uncover many web sites still\n                            in their infancy. Packages and web page editors now use Lorem Ipsum as their\n                            default model text.\n                        </p>\n                        <img src="img/gallery/11.jpg" class="img-responsive">\n                        <div class="btn-group">\n                            <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>\n                            <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>\n                            <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>\n                        </div>\n                    </div>'), "\n                    ", HTML.DIV({
    "class": "social-footer"
  }, "\n                        ", HTML.Raw('<div class="social-comment">\n                            <a href="" class="pull-left">\n                                <img alt="image" src="img/a1.jpg">\n                            </a>\n                            <div class="media-body">\n                                <a href="#">\n                                    Andrew Williams\n                                </a>\n                                Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words.\n                                <br>\n                                <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -\n                                <small class="text-muted">12.06.2014</small>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.Raw('<div class="social-comment">\n                            <a href="" class="pull-left">\n                                <img alt="image" src="img/a2.jpg">\n                            </a>\n                            <div class="media-body">\n                                <a href="#">\n                                    Andrew Williams\n                                </a>\n                                Making this the first true generator on the Internet. It uses a dictionary of.\n                                <br>\n                                <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -\n                                <small class="text-muted">10.07.2014</small>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.Raw('<div class="social-comment">\n                            <a href="" class="pull-left">\n                                <img alt="image" src="img/a8.jpg">\n                            </a>\n                            <div class="media-body">\n                                <a href="#">\n                                    Andrew Williams\n                                </a>\n                                Making this the first true generator on the Internet. It uses a dictionary of.\n                                <br>\n                                <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -\n                                <small class="text-muted">10.07.2014</small>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.DIV({
    "class": "social-comment"
  }, "\n                            ", HTML.Raw('<a href="" class="pull-left">\n                                <img alt="image" src="img/a3.jpg">\n                            </a>'), "\n                            ", HTML.DIV({
    "class": "media-body"
  }, "\n                                ", HTML.TEXTAREA({
    "class": "form-control",
    placeholder: "Write comment..."
  }), "\n                            "), "\n                        "), "\n\n                    "), "\n\n                "), "\n\n                ", HTML.DIV({
    "class": "social-feed-box"
  }, "\n\n                    ", HTML.Raw('<div class="pull-right social-action dropdown">\n                        <button data-toggle="dropdown" class="dropdown-toggle btn-white">\n                            <i class="fa fa-angle-down"></i>\n                        </button>\n                        <ul class="dropdown-menu m-t-xs">\n                            <li><a href="#">Config</a></li>\n                        </ul>\n                    </div>'), "\n                    ", HTML.Raw('<div class="social-avatar">\n                        <a href="" class="pull-left">\n                            <img alt="image" src="img/a4.jpg">\n                        </a>\n                        <div class="media-body">\n                            <a href="#">\n                                Andrew Williams\n                            </a>\n                            <small class="text-muted">Today 4:21 pm - 12.06.2014</small>\n                        </div>\n                    </div>'), "\n                    ", HTML.Raw('<div class="social-body">\n                        <p>\n                            Packages and web page editors now use Lorem Ipsum as their\n                            default model text. Page editors now use Lorem Ipsum as their\n                            default model text.\n                        </p>\n                        <div class="btn-group">\n                            <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>\n                            <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>\n                            <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>\n                        </div>\n                    </div>'), "\n                    ", HTML.DIV({
    "class": "social-footer"
  }, "\n\n\n                        ", HTML.Raw('<div class="social-comment">\n                            <a href="" class="pull-left">\n                                <img alt="image" src="img/a8.jpg">\n                            </a>\n                            <div class="media-body">\n                                <a href="#">\n                                    Andrew Williams\n                                </a>\n                                Making this the first true generator on the Internet. It uses a dictionary of.\n                                <br>\n                                <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -\n                                <small class="text-muted">10.07.2014</small>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.DIV({
    "class": "social-comment"
  }, "\n                            ", HTML.Raw('<a href="" class="pull-left">\n                                <img alt="image" src="img/a3.jpg">\n                            </a>'), "\n                            ", HTML.DIV({
    "class": "media-body"
  }, "\n                                ", HTML.TEXTAREA({
    "class": "form-control",
    placeholder: "Write comment..."
  }), "\n                            "), "\n                        "), "\n                    "), "\n                "), "\n\n            "), "\n            ", HTML.DIV({
    "class": "col-lg-6"
  }, "\n                ", HTML.Raw('<div class="ibox ">\n                    <div class="ibox-content text-center">\n\n                        <h3 class="m-b-xxs">Social feed style 2</h3>\n                        <small>News block with separate avatar picture</small>\n                    </div>\n                </div>'), "\n                ", HTML.DIV({
    "class": "social-feed-separated"
  }, "\n\n                    ", HTML.Raw('<div class="social-avatar">\n                        <a href="">\n                            <img alt="image" src="img/a5.jpg">\n                        </a>\n                    </div>'), "\n\n                    ", HTML.DIV({
    "class": "social-feed-box"
  }, "\n\n                        ", HTML.Raw('<div class="pull-right social-action dropdown">\n                            <button data-toggle="dropdown" class="dropdown-toggle btn-white">\n                                <i class="fa fa-angle-down"></i>\n                            </button>\n                            <ul class="dropdown-menu m-t-xs">\n                                <li><a href="#">Config</a></li>\n                            </ul>\n                        </div>'), "\n                        ", HTML.Raw('<div class="social-avatar">\n                            <a href="#">\n                                Andrew Williams\n                            </a>\n                            <small class="text-muted">Today 4:21 pm - 12.06.2014</small>\n                        </div>'), "\n                        ", HTML.Raw('<div class="social-body">\n                            <p>\n                                Many desktop publishing packages and web page editors now use Lorem Ipsum as their\n                                default model text, and a search for \'lorem ipsum\' will uncover many web sites still\n                                in their infancy. Packages and web page editors now use Lorem Ipsum as their\n                                default model text.\n                            </p>\n                            <img src="img/gallery/9.jpg" class="img-responsive">\n                            <div class="btn-group">\n                                <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>\n                                <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>\n                                <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>\n                            </div>\n                        </div>'), "\n                        ", HTML.DIV({
    "class": "social-footer"
  }, "\n                            ", HTML.Raw('<div class="social-comment">\n                                <a href="" class="pull-left">\n                                    <img alt="image" src="img/a3.jpg">\n                                </a>\n                                <div class="media-body">\n                                    <a href="#">\n                                        Andrew Williams\n                                    </a>\n                                    Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words.\n                                    <br>\n                                    <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -\n                                    <small class="text-muted">12.06.2014</small>\n                                </div>\n                            </div>'), "\n\n                            ", HTML.DIV({
    "class": "social-comment"
  }, "\n                                ", HTML.Raw('<a href="" class="pull-left">\n                                    <img alt="image" src="img/a4.jpg">\n                                </a>'), "\n                                ", HTML.Raw('<div class="media-body">\n                                    <a href="#">\n                                        Andrew Williams\n                                    </a>\n                                    Making this the first true generator on the Internet. It uses a dictionary of.\n                                    <br>\n                                    <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -\n                                    <small class="text-muted">10.07.2014</small>\n                                </div>'), "\n\n                                ", HTML.Raw('<div class="social-comment">\n                                    <a href="" class="pull-left">\n                                        <img alt="image" src="img/a7.jpg">\n                                    </a>\n                                    <div class="media-body">\n                                        <a href="#">\n                                            Andrew Williams\n                                        </a>\n                                        Making this the first true generator on the Internet. It uses a dictionary of.\n                                        <br>\n                                        <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -\n                                        <small class="text-muted">10.07.2014</small>\n                                    </div>\n                                </div>'), "\n\n                                ", HTML.DIV({
    "class": "social-comment"
  }, "\n                                    ", HTML.Raw('<a href="" class="pull-left">\n                                        <img alt="image" src="img/a8.jpg">\n                                    </a>'), "\n                                    ", HTML.DIV({
    "class": "media-body"
  }, "\n                                        ", HTML.TEXTAREA({
    "class": "form-control",
    placeholder: "Write comment..."
  }), "\n                                    "), "\n                                "), "\n\n                            "), "\n\n                            ", HTML.Raw('<div class="social-comment">\n                                <a href="" class="pull-left">\n                                    <img alt="image" src="img/a6.jpg">\n                                </a>\n                                <div class="media-body">\n                                    <a href="#">\n                                        Andrew Williams\n                                    </a>\n                                    Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words.\n                                    <br>\n                                    <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -\n                                    <small class="text-muted">12.06.2014</small>\n                                </div>\n                            </div>'), "\n\n                            ", HTML.Raw('<div class="social-comment">\n                                <a href="" class="pull-left">\n                                    <img alt="image" src="img/a7.jpg">\n                                </a>\n                                <div class="media-body">\n                                    <a href="#">\n                                        Andrew Williams\n                                    </a>\n                                    Making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words.\n                                    <br>\n                                    <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -\n                                    <small class="text-muted">12.06.2014</small>\n                                </div>\n                            </div>'), "\n\n                            ", HTML.DIV({
    "class": "social-comment"
  }, "\n                                ", HTML.Raw('<a href="" class="pull-left">\n                                    <img alt="image" src="img/a3.jpg">\n                                </a>'), "\n                                ", HTML.DIV({
    "class": "media-body"
  }, "\n                                    ", HTML.TEXTAREA({
    "class": "form-control",
    placeholder: "Write comment..."
  }), "\n                                "), "\n                            "), "\n\n                        "), "\n\n                    "), "\n\n                "), "\n\n                ", HTML.DIV({
    "class": "social-feed-separated"
  }, "\n\n                    ", HTML.Raw('<div class="social-avatar">\n                        <a href="">\n                            <img alt="image" src="img/a8.jpg">\n                        </a>\n                    </div>'), "\n\n                    ", HTML.DIV({
    "class": "social-feed-box"
  }, "\n\n                        ", HTML.Raw('<div class="pull-right social-action dropdown">\n                            <button data-toggle="dropdown" class="dropdown-toggle btn-white">\n                                <i class="fa fa-angle-down"></i>\n                            </button>\n                            <ul class="dropdown-menu m-t-xs">\n                                <li><a href="#">Config</a></li>\n                            </ul>\n                        </div>'), "\n                        ", HTML.Raw('<div class="social-avatar">\n                            <a href="#">\n                                Andrew Williams\n                            </a>\n                            <small class="text-muted">Today 4:21 pm - 12.06.2014</small>\n                        </div>'), "\n                        ", HTML.Raw('<div class="social-body">\n                            <p>\n                                Many desktop publishing packages and web page editors now use Lorem Ipsum as their\n                                default model text, and a search for \'lorem ipsum\' will uncover many web sites still\n                                in their infancy.\n                            </p>\n                            <div class="btn-group">\n                                <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>\n                                <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>\n                                <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>\n                            </div>\n                        </div>'), "\n                        ", HTML.DIV({
    "class": "social-footer"
  }, "\n                            ", HTML.Raw('<div class="social-comment">\n                                <a href="" class="pull-left">\n                                    <img alt="image" src="img/a3.jpg">\n                                </a>\n                                <div class="media-body">\n                                    <a href="#">\n                                        Andrew Williams\n                                    </a>\n                                    Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words.\n                                    <br>\n                                    <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -\n                                    <small class="text-muted">12.06.2014</small>\n                                </div>\n                            </div>'), "\n\n                            ", HTML.Raw('<div class="social-comment">\n                                <a href="" class="pull-left">\n                                    <img alt="image" src="img/a1.jpg">\n                                </a>\n                                <div class="media-body">\n                                    <a href="#">\n                                        Andrew Williams\n                                    </a>\n                                    Making this the first true generator on the Internet. It uses a dictionary of.\n                                    <br>\n                                    <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -\n                                    <small class="text-muted">10.07.2014</small>\n                                </div>\n                            </div>'), "\n\n                            ", HTML.DIV({
    "class": "social-comment"
  }, "\n                                ", HTML.Raw('<a href="" class="pull-left">\n                                    <img alt="image" src="img/a4.jpg">\n                                </a>'), "\n                                ", HTML.DIV({
    "class": "media-body"
  }, "\n                                    ", HTML.TEXTAREA({
    "class": "form-control",
    placeholder: "Write comment..."
  }), "\n                                "), "\n                            "), "\n\n                        "), "\n\n                    "), "\n\n                "), "\n\n                ", HTML.DIV({
    "class": "social-feed-separated"
  }, "\n\n                    ", HTML.Raw('<div class="social-avatar">\n                        <a href="">\n                            <img alt="image" src="img/a2.jpg">\n                        </a>\n                    </div>'), "\n\n                    ", HTML.DIV({
    "class": "social-feed-box"
  }, "\n\n                        ", HTML.Raw('<div class="pull-right social-action dropdown">\n                            <button data-toggle="dropdown" class="dropdown-toggle btn-white">\n                                <i class="fa fa-angle-down"></i>\n                            </button>\n                            <ul class="dropdown-menu m-t-xs">\n                                <li><a href="#">Config</a></li>\n                            </ul>\n                        </div>'), "\n                        ", HTML.Raw('<div class="social-avatar">\n                            <a href="#">\n                                Andrew Williams\n                            </a>\n                            <small class="text-muted">Today 4:21 pm - 12.06.2014</small>\n                        </div>'), "\n                        ", HTML.Raw('<div class="social-body">\n                            <p>\n                                Text, and a search for \'lorem ipsum\' will uncover many web sites still\n                                in their infancy.\n                            </p>\n                            <div class="btn-group">\n                                <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>\n                                <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>\n                                <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>\n                            </div>\n                        </div>'), "\n                        ", HTML.DIV({
    "class": "social-footer"
  }, "\n\n                            ", HTML.DIV({
    "class": "social-comment"
  }, "\n                                ", HTML.Raw('<a href="" class="pull-left">\n                                    <img alt="image" src="img/a4.jpg">\n                                </a>'), "\n                                ", HTML.DIV({
    "class": "media-body"
  }, "\n                                    ", HTML.TEXTAREA({
    "class": "form-control",
    placeholder: "Write comment..."
  }), "\n                                "), "\n                            "), "\n\n                        "), "\n\n                    "), "\n\n                "), "\n\n\n            "), "\n        "), "\n    ") ];
}));

})();
