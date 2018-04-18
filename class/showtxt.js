

const Show = {

  fun: null,

  setFun: function (f) {
    this.fun = f;

  },

  show: function (txt) {
    if (this.fun)
      this.fun(txt);

  },

  showJson: function (json) {
    if (this.fun)
      this.fun(JSON.stringify(json));

  },

};

module.exports = Show;