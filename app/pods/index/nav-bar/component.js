import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',
  classNames: ['container-fluid'],

  isShowingEmailButton: false,

  didInsertElement() {
    setActiveAnchor.call(this);
    this._anchorChangeListener = setActiveAnchor.bind(this);

    window.addEventListener('scroll', this._anchorChangeListener, true);
    window.addEventListener('resize', this._anchorChangeListener, true);
  },

  willDestroyElement() {
    window.removeEventListener('scroll', this._anchorChangeListener, true);
    window.removeEventListener('resize', this._anchorChangeListener, true);

    this._anchorChangeListener = null;
  }
});

function setActiveAnchor() {
  let sections = Array.from(document.querySelectorAll('section.info'));
  let anchorLinks = this.element.querySelectorAll('a:not([href="#"])');
  let minTop = window.innerHeight * .5;

  // n.b. `reverse` reverses the array in place, so we count down
  let firstVisibleIndex = (sections.length - 1) - sections.reverse()
    .findIndex((elem) => elem.getBoundingClientRect().top <= minTop);

  anchorLinks.forEach((elem, index) => {
    if (index === firstVisibleIndex) {
      elem.classList.add('active');
    } else {
      elem.classList.remove('active');
    }
  });
}
