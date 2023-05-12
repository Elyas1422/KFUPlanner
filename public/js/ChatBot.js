import { Bard } from "googlebard";

let bot = new Bard(`WQhDR2OFdX9Dk83ItME45PFO0vSXEmC8tgFK8xUb0lTEaOyQ9qbj2CF0eRB0hE2UpeNC_A.`);

let response = await bot.ask("Hello?");
console.log(response);