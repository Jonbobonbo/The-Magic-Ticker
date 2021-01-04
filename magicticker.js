// these are some variables that are useful to have globally scoped

var newSpell = document.getElementById( "newSpell" ); //declares variable to target div
var track = document.getElementById( "track" ); // declare variable to target button
var round = 0; // rounds are at 0 when out of combat. beginning combat moves round to 1

var i;

// making arrays to call their indexes later
var toggle = [];
toggle = document.getElementsByClassName( "toggle" ); // checkbox to toggle whether ability is active or not

var title = [];
spellTitle = document.getElementsByClassName( "title" ); 

var duration = [];
duration = document.getElementsByClassName( "duration" );

var perDay = [];
perDay = document.getElementsByClassName( "perDay" );

// tracked abilities as an object
var itemsTracked = {
    titleData: spellTitle,
    toggleData: toggle,
    durationData: duration,
    perDayData: perDay
} // end object

// allow the user to enter combat and advance rounds
function advanceRound() {

    round++; // increment the current round number with every button press
    console.log( round );

    if ( round > 0 ) {
        document.getElementById( "nextRound" ).innerText = "Next Round " + " (Round " + round + ")";   //change button text to show it will advance current round by 1 once combat has been entered and show what the current round is
    }  // end if statement

    for ( let i = 0; i < itemsTracked.toggleData.length; i++ ) {
        if ( itemsTracked.toggleData[i].checked == true && round > 1 ) {
                itemsTracked.durationData[i].value = itemsTracked.durationData[i].value - 1; // decrement duration when active and rounds increase
        }   // end if statement
        if ( itemsTracked.toggleData[i].checked == true && itemsTracked.durationData[i].value <= 0 ) {
                itemsTracked.toggleData[i].checked = false; // unchecks box when round reaches 0
                alert ( itemsTracked.titleData[i].innerText + " has expired" ); // alerts user when rounds on active ability reach 0
        } // end if statement
    } // end for loop

} // end advanceRound()

// function to end combat and reset rounds to zero.
function outOfCombat() {

    round = 0; // rounds start at 0 before combat
    console.log( round );

    document.getElementById( "nextRound" ).innerText = "Begin Combat"; // change button text back to begin combat once out of rounds
    
    for ( let i=0; i < itemsTracked.toggleData.length; i++ ) {
        if ( itemsTracked.toggleData[i].checked == true ) {
                itemsTracked.toggleData[i].checked = false;  // clears all checked boxes
        } // end second if statement
    } // end for loop

} // end outOfCombat()

// function to reset uses per day and duration input fields to their default values
function restFunction() {
    
    for ( let i = 0; i < itemsTracked.toggleData.length; i++ ) {
        if ( itemsTracked.toggleData[i].checked == true ) {
                itemsTracked.toggleData[i].checked = false;   // unchecks any checked boxes
        } // end if statement
        itemsTracked.durationData[i].value = itemsTracked.durationData[i].defaultValue;  // resets to default value which is decided when created
        itemsTracked.perDayData[i].value = itemsTracked.perDayData[i].defaultValue; // resets to default value which is decided when created
    } // end for loop
   
} // end restFunction() 


// function to add new paragraph element with interactive information about item being tracked
function addNew() {

    let defaultDuration = document.getElementById( "defaultDuration" ).value;
    let defaultDaily = document.getElementById( "defaultDaily" ).value; 
    let title = document.getElementById( "title" ).value;

    console.log( title );

    // creating the following items to append to the div will automatically push them into the arrays I have declared above by adding the correct class attribute
    let p = document.createElement( "p" ); //stores a new paragraph element in memory
    newSpell.appendChild( p ).innerHTML = "<span class='title'><b>" + title  + "</b></span><input class='toggle' type='checkbox' onchange='onDown(this)'>ON/OFF<br>";

    // create label for duration input field
    let durationLabel = document.createElement( "label" ); // stores new label element in memory
    durationLabel.for = "durationInput";
    newSpell.lastChild.appendChild( durationLabel ).innerHTML = "Rounds remaining: ";

    // create and append duration field and default value
    let durationInput = document.createElement( "input" );
    durationInput.type = "number";
    durationInput.className = "duration";
    durationInput.min = "0";
    durationInput.defaultValue = defaultDuration; // assigns default value to be the value entered in static entry field
    newSpell.lastChild.appendChild( durationInput );

    console.log( durationInput.value );

    // create label for perDay input field
    let dailyLabel = document.createElement( "label" );
    dailyLabel.for = "dailyInput";
    newSpell.lastChild.appendChild( dailyLabel ).innerHTML = "<br>Daily uses remaining: ";

    // create and append uses per day field and default value
    let dailyInput = document.createElement( "input" );
    dailyInput.type = "number";
    dailyInput.className = "perDay";
    dailyInput.defaultValue = defaultDaily; // assigns the default value to be the value entered in the static entry field
    newSpell.lastChild.appendChild( dailyInput ); 

    // reset the entry input data
    document.getElementById("title").value = ''; 
    document.getElementById("defaultDuration").value = '';
    document.getElementById("defaultDaily").value = '';
    
} // end addNew()

// function to remove the last ul element in the div
function removeLast() {

    let r = confirm( "Are you sure you want to delete it?" ) // confirm the deletion because buttons go click by accident
    if ( r == true ) {
        newSpell.removeChild( newSpell.lastChild );   // removes the last element if confirmed
    } // end if statement
    else {
        alert ( "Whew, scared me for a second" ); // i just thought it was funny
    } // end else statement

} // end removeLast()

// this function decrements the perDay "daily uses remaining" value when box is checked
function onDown(e) {
    e.preventDefault;
    for ( let i = 0; i < itemsTracked.toggleData.length; i++ ) {
        if ( itemsTracked.toggleData[i] == event.currentTarget && itemsTracked.toggleData[i].checked ) {
            itemsTracked.perDayData[i].value = itemsTracked.perDayData[i].value - 1;
            itemsTracked.durationData[i].value = itemsTracked.durationData[i].defaultValue;
        } // end if statement
    } // end for loop
} // end onDown()

// end of JavaScript