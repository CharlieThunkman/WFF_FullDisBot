const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift();
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750);
    }
}

module.exports = async (client, id, text, reactions, mID) => {
    const channel = await client.channels.fetch(id);

    channel.messages.fetch(mID).then((messages) => {
        if (messages.size <= 2) {
            //Send cooresponding message
            channel.send(text).then(message => {
                const reactionCopy = reactions;
                addReactions(message, reactionCopy);
            })
        } else {
            //Edit existing message
            messageCount = messages.size - 1
            // console.log(message);
            // console.log(messages[index])
            //message[1].edit(text);
            for (const message of messages) {
                console.log(messageCount);
                console.log(message[1].id);
                message[mID].edit(text);
                addReactions(message[mID], reactions);
                messageCount--;
            }
        }
        console.log(messages);
    }).catch(console.error);
    /*
    async execute(client, id, text, reactions = [], index) {
        const channel = await client.channels.fetch(id);

        channel.messages.fetch().then((messages) => {
            if (messages.size <= index - 1) {
                //Send cooresponding message
                channel.send(text).then(message => {
                    addReactions(message, reactions);
                })
            } else {
                //Edit existing message
                messageCount = 0
                for (const message of messages) {
                    messageCount++;
                    console.log(messageCount);
                }
            }
        });
    },
    */
   return 
}
