import discord
import asyncio
import sys
import json
from Keys import key
class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')



    #checks message contents for links to twitter, bluesky or pixiv and then fixes the links for embed
    async def on_message(self, message):
        print("started check")
        

        input_data = sys.argv[1]
        data = json.loads(input_data)
        req = data["req"]
        Name = data["Name"]

        result = f"request:{req}\n Name: {Name}\n Stock Status: NA"
        
        if message.author == client.user:
            return

        if "amiami" in message.content:
            val = result
            return await message.channel.send(val)

            
intents = discord.Intents.default()
intents.message_content = True
client = MyClient(intents=intents)
client.run(key.key)