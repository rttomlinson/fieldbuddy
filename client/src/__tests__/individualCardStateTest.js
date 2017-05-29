import deepFreeze from 'deep-freeze';
it("changes the value of editDescriptionMode with toggleEditDescriptionMode", function(){
    const initialState = {
        editDescriptionMode: false
    }
    const propertiesToUpdate = {
        editDescriptionMode: !initialState.editDescriptionMode
    }
    const finalState = {
        editDescriptionMode: true
    }
    deepFreeze(initialState);
    deepFreeze(propertiesToUpdate);
    expect(setState(initialState, propertiesToUpdate)).toEqual(finalState);
})

/*
State of a single card - All possible state

1. Card is in descriptionEditMode
    How to get to descriptionEditMode?
        Only when a user clicks on "Edit description"
        
2. Card is not in descriptionEditMode





*/