/**
 * Prepopulates the members array with an initial dataset of 40 GymMember
 * instances. This acts as simulated persistent data for testing and demonstration.
 */


/**
 * Initial seed data for the application.
 * Uses the GymMember constructor to create realistic entries.
 *
 * @type {GymMember[]}
 */
members = [
    // --- ORIGINAL 10 ---
    new GymMember("100001", "12ABcd", "Alex", "Johnson", "2024-01-10", "", true, false),
    new GymMember("100002", "34Efgh", "Brittany", "Lopez", "2023-11-05", "2024-09-01", false, true),
    new GymMember("100003", "56Ijkl", "Chris", "Miller", "2022-07-21", "", true, true),
    new GymMember("100004", "78Mnop", "Dan", "Nguyen", "2024-03-15", "", false, false),
    new GymMember("100005", "90Qrst", "Ella", "Brown", "2023-02-02", "2024-01-31", true, false),
    new GymMember("100006", "11Uvwx", "Felix", "Garcia", "2021-09-13", "", false, true),
    new GymMember("100007", "22Yzab", "Grace", "Wilson", "2020-04-09", "", true, true),
    new GymMember("100008", "33CDef", "Henry", "Davis", "2019-06-30", "2023-12-31", false, false),
    new GymMember("100009", "44Ghij", "Isla", "Martinez", "2024-04-20", "", true, false),
    new GymMember("100010", "55Klmno", "Jacob", "Young", "2023-05-11", "", true, true),

    // --- NEW MEMBERS (30 more for Pagination) ---
    new GymMember("100011", "67Pqrs", "Liam", "Anderson", "2022-03-14", "", true, false),
    new GymMember("100012", "68TuVwx", "Mia", "Thomas", "2021-07-22", "2023-09-01", false, false),
    new GymMember("100013", "69YZaab", "Noah", "Moore", "2020-01-16", "", true, true),
    new GymMember("100014", "70Bcdef", "Olivia", "Taylor", "2024-02-01", "", false, true),
    new GymMember("100015", "71Ghijk", "Ethan", "Harris", "2023-08-12", "", false, false),
    new GymMember("100016", "72Lmno", "Ava", "Clark", "2022-11-30", "", true, false),
    new GymMember("100017", "73Pqrstu", "Mason", "Lewis", "2024-01-03", "", false, true),
    new GymMember("100018", "74Uvwx", "Sophia", "Walker", "2021-04-20", "", true, true),
    new GymMember("100019", "75Yzaaa", "Logan", "Hall", "2020-06-11", "2023-07-25", false, false),
    new GymMember("100020", "76BcdEf", "Charlotte", "Allen", "2024-04-01", "", true, false),

    new GymMember("100021", "77FghIJ", "James", "Scott", "2023-10-05", "", true, true),
    new GymMember("100022", "78Klmno", "Amelia", "King", "2021-05-13", "2023-09-18", false, true),
    new GymMember("100023", "79PQRST", "Benjamin", "Green", "2022-02-24", "", false, false),
    new GymMember("100024", "80UVwxy", "Harper", "Baker", "2020-03-30", "", true, false),
    new GymMember("100025", "81Zabcd", "Lucas", "Gonzalez", "2019-12-11", "2023-01-10", false, false),
    new GymMember("100026", "82Efghi", "Ella", "Nelson", "2024-04-15", "", true, false),
    new GymMember("100027", "83Jklmn", "Henry", "Carter", "2023-08-05", "", false, true),
    new GymMember("100028", "84Opqrs", "Scarlett", "Mitchell", "2021-09-27", "", true, true),
    new GymMember("100029", "85Tuvwx", "Alexander", "Perez", "2020-07-07", "", false, false),
    new GymMember("100030", "86Yzabc", "Chloe", "Roberts", "2023-11-02", "", true, true),

    new GymMember("100031", "87Defgh", "William", "Turner", "2022-06-19", "", false, true),
    new GymMember("100032", "88HijkL", "Aria", "Phillips", "2021-03-03", "2024-03-01", true, false),
    new GymMember("100033", "89MnOPQ", "Sebastian", "Campbell", "2020-09-29", "", true, true),
    new GymMember("100034", "90Rstuv", "Luna", "Parker", "2024-01-15", "", false, false),
    new GymMember("100035", "91WxyZa", "Jack", "Evans", "2023-04-16", "", true, false),
    new GymMember("100036", "92Bcdef", "Avery", "Edwards", "2021-10-25", "", false, true),
    new GymMember("100037", "93Ghijk", "Owen", "Collins", "2019-08-12", "2023-05-01", false, false),
    new GymMember("100038", "94LmnoP", "Sofia", "Stewart", "2024-02-22", "", true, true),
    new GymMember("100039", "95Qrstu", "Wyatt", "Sanchez", "2023-06-03", "", true, false),
    new GymMember("100040", "96UvWxy", "Aubrey", "Morris", "2020-01-09", "", false, false)
];
