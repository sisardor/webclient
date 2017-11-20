! function(t) {
    function e(t) {
        if (t.length < 8) throw new Error("Must be at least 8 characters.");
        if (t.length > 256) throw new Error("Must be less than 256 characters long.");
        if (/((.)\2{3,})/.test(t)) throw new Error("Must not have a character repeated 4 or more times consecutively.");
        if (!(t.length >= 16)) {
            var e = /[a-z]/.test(t),
                s = /[A-Z]/.test(t),
                a = /[0-9]/.test(t),
                r = /[^a-zA-Z0-9]/.test(t);
            if (!(e && s && a && r)) throw new Error("Must contain at least one lowercase, uppercase, number, and special character.")
        }
    }
    var s = 4,
        a = ["Must be at least 8 characters.", "That could be better.", "That's alright.", "That's good.", "That's great!"];
    t.fn.addPasswordIndicator = function() {
        function r() {
            var t, s, r = d.val();
            try {
                e(r)
            } catch (t) {
                s = t.message
            }
            t = s ? 0 : window.zxcvbn ? Math.max(1, window.zxcvbn(r, []).score) : -1, n.attr("data-password-strength", t), s ? $popoverTitle.text(s) : t > 0 && $popoverTitle.text(a[t]), t > 0 && h.show()
        }

        function o() {
            return parseInt(n.attr("data-password-strength"), 10)
        }
        var n, p, h, i, c, d = this;
        if (d.is('input[type="password"]')) {
            for (n = d.parent(), n.addClass("password-strength").attr("data-password-strength", -1), p = t("<span/>", {
                    "class": "password-strength-indicator"
                }).appendTo(n), c = 0; c < s; c++) t("<span/>").appendTo(p);
            h = t("<span/>", {
                "class": "password-strength-popover"
            }).appendTo(n), $popoverTitle = t("<span/>", {
                "class": "password-strength-popover-status"
            }).appendTo(h), t("<span/>", {
                "class": "password-strength-popover-explanation",
                text: "Good passwords are hard to guess. Try using a multi-word phrase, uncommon words, numbers or symbols."
            }).appendTo(h), d.on({
                keyup: function() {
                    i && window.clearTimeout(i), i = window.setTimeout(r, 100)
                },
                blur: function() {
                    value = d.val(), strength = o(), !value.length || 0 !== strength && 1 !== strength ? h.hide() : h.show()
                }
            }), p.on({
                mouseenter: function() {
                    h.show()
                },
                mouseleave: function() {
                    o() > 1 && h.hide()
                }
            })
        }
        return this
    }
}(jQuery);
