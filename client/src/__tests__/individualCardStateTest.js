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