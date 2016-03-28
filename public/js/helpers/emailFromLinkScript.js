var email = function () {
    var link = window.location.toString();
    var email = link.substring(62);
    return(email);
};