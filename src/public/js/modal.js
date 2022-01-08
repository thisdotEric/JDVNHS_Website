window.onload = function () {
  var modal = new RModal(document.getElementById('modal'), {
    beforeOpen: function (next) {
      console.log('beforeOpen');
      next();
    },
    afterOpen: function () {
      console.log('opened');
    },
    beforeClose: function (next) {
      console.log('beforeClose');
      next();
    },
    afterClose: function () {
      console.log('closed');
    },
    dialogOpenClass: 'animate__slideInDown',
    dialogCloseClass: 'animate__slideOutUp',
    // bodyClass: 'modal-open',
    // dialogClass: 'modal-dialog',

    // focus: true,
    // focusElements: ['input.form-control', 'textarea', 'button.btn-primary'],

    // escapeClose: true,
  });

  document.addEventListener(
    'keydown',
    function (ev) {
      modal.keydown(ev);
    },
    false
  );

  modal.open();

  window.modal = modal;
};
