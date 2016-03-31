//Script helps to get e-mail from link to set it in invitation template.
var email = function () {
    var link = window.location.toString();
    var email = link.substring(62);

    return email;
};