/* global describe, it */
(function () {
    'use strict';

    describe('Set up the page', function () {
      describe('verify the json', function () {
        it('should have seven entries', function () {
          json.richtu.index.should.equal(7);
          json.espn.index.should.equal(2);
        });
      });
      describe('verify the markup is correct', function() {
        it('should contain the main container', function(){
          assert(!!document.getElementById('work'));
        });
        it('should contain the sidebar', function() {
          document.getElementsByClassName('project').length.should.equal(8);
        });
        it('should contain the img', function() {
          assert(!!document.getElementById('screenshot'));
          assert(!!document.getElementById('caption'));
        });
      });
    });

    describe('Test the Portfolio object', function(){
      describe('Portfolio privileged functions', function() {
        describe('getListIndex()', function(){
          it('should return an integer from a project name', function(){
            SNAIL.folio.getListIndex('richtu').should.equal(7);
          });
        });
        describe('prototype.getImgArr()', function(){
          it('should return an array same length as the json', function(){
            SNAIL.utils.getImgArr(json).length.should.equal(8);
          });
        });
      });

      describe('Portfolio Events', function() {
        describe('Hover Events', function(){
          var newDiv;

          beforeEach(function(){
            newDiv = document.createElement('div');
            newDiv.innerHTML = "text";
            document.body.appendChild(newDiv);
          });
          afterEach(function(){
            document.body.removeChild(newDiv);
          });

          describe('fadeIn()', function() {
            it('should set the opacity to 1', function(){
              SNAIL.utils.fadeIn(newDiv);
              setTimeout(function(){
                expect(+newDiv.style.opacity).to.be.at.least(1);
              }, 1000);
            });
          });

          describe('fadeOut', function() {
            it('should set the opacity to 0', function(){
              SNAIL.utils.fadeOut(newDiv);
              setTimeout(function(){
                expect(+newDiv.style.opacity).to.be.at.most(0);
              }, 1000);
            });
          });
        });
        describe('Click events', function(){
          describe('swapImg()', function(){
            it('should set the slideshow image to image of the project you pass in for all values of json', function(){
              for (var key in json) {
                if (json.hasOwnProperty(key)) {
                  SNAIL.folio.swapImg(key);
                  expect(SNAIL.folio.getDefaults()._img.attributes.src.value).to.deep.equal(json[key].img);
                }
              }
            });
          });
          describe('updateSidebar()', function(){
            it('should set the defaults with the project you pass in', function(){
              for (var key in json) {
                if (json.hasOwnProperty(key)) {
                  SNAIL.folio.updateSidebar(key);
                  assert(SNAIL.folio.getDefaults()._list[SNAIL.folio.getListIndex(key)].classList.contains('selected'));
                  expect(SNAIL.folio.getDefaults()._selected).to.deep.equal(key);
                }
              }
            });
          });
        });
      });
    });
})();