/// <reference types="cypress" />

const allCourts = [...Array(8).keys()].slice(1);
const d = new Date();
const nextTuesday = d.getDate() + ((7-d.getDay())%7+2) % 7;

function check(court, day, hour) {
    it(`San Carlos Court ${court} available on date ${day}`, () => {
      cy.visit('https://a.frontend.bukza.com/?t=202109261651193111#/user/16509/timetable/15296/catalog/17048_17099')
        .contains(`San Carlos Court ${court}`)
        .click();

      cy.get(':nth-child(2) > :nth-child(1) > .calendar-page__resource')
        .contains('.day:not(.day_other) > .day__body > .day__name', ` ${day} `)
        .parent()
        .click({force: true});
      cy.get('.time-rental__times')
        .contains(` ${hour}:00 PM `);
    });
}

describe('bintang booking', () => {

  it.skip('open San Carlos Courts from home page', () => {
    cy.visit('https://a.frontend.bukza.com/?t=202109261651193111#/user/16509/timetable/15296?container=BukzaContainer15296&autoresize=true')
    cy.get('.catalog__body')
      .parent()
      .contains('San Carlos Courts')
      .parent()
      .find('.action-button')
      .click();
  });

  // San Carlos Court 3 available on day 28, 7pm
  // check(3, 28, 7)

  // check courts
  [3,4,5].forEach(i => {
    check(i, nextTuesday, 7);
  });
  
})
