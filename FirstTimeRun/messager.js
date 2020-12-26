const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift();
    if (reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 750);
    }
}

module.exports = async (client, id, text, reactions, index) => {
    const channel = await client.channels.fetch(id);

    channel.messages.fetch().then((messages) => {
        if (messages.size <= index - 1) {
            //Send cooresponding message
            channel.send(text).then(message => {
                const reactionCopy = reactions;
                addReactions(message, reactionCopy);
            })
        } else {
            //Edit existing message
            messageCount = 0
            // console.log(message);
            // console.log(messages[index])
            //message[1].edit(text);
            for (const message of messages) {
                messageCount++;
                console.log(messageCount);
                console.log(message[messageCount]);
                message[index].edit(text);
                addReactions(message[index], reactions);
            }
        }
        console.log(messages);
        return '433';
    });
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