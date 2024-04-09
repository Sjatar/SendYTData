Uses violent monkey to load a js script to any youtube domain. 

Script opens a websocket connection to streamer bot and will send youtube title, video_id and current time.

--------------------------------------------------------------------------------

I use violent monkey and firefox, I don't expect it to work on chrome but if anybody tries you can tell me how it goes!

Raw script: https://raw.githubusercontent.com/Sjatar/YTData2Streamer.bot/main/userscript.js

--------------------------------------------------------------------------------

To download it, download violent monkey and go into settings. Press the add button and new.
![image](https://github.com/Sjatar/YTData2Streamer.bot/assets/56020444/b20cf089-1d2d-4d83-abee-0f4d9955ae0f)

Copy the raw script above and paste it in! Don't be scared, but we need to edit two things!

--------------------------------------------------------------------------------

You can see two lines in the websocket message we send, "id" and "name". This is line 83 and 84!
![image](https://github.com/Sjatar/YTData2Streamer.bot/assets/56020444/8cedb196-e073-4542-a920-a4d55b45bc94)

You want to create a action in streamer.bot called something like "YoutubePlayback", paste this name instead of the existing name!

You want to right click the action you created and copy the "action id", paste this instead of the existing id!

--------------------------------------------------------------------------------

In streamer.bot you want to setup sub-actions for the action you created to make the recieved variables into global variables!
![image](https://github.com/Sjatar/YTData2Streamer.bot/assets/56020444/57a1d363-e204-4018-87e5-bb6c20e5fb52)

You should now be able to see the variables in global variables if the script is able to send the websocket message ^^ 

--------------------------------------------------------------------------------

Use responsibly! 
