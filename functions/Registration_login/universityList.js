
module.exports = {
    university_list : university_list
}

function university_list(callback) {
        const universityList = [
            "University of Mumbai, Mumbai",
            "Shreemati Nathibai Damodar Thackersey Women's University, Mumbai",
            "Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur",
            "Savitribai Phule Pune University, Pune",
            "Dr. Babasaheb Ambedkar Marathwada University, Aurangabad",
            "Shivaji University, Kolhapur",
            "Sant Gadge Baba Amravati University, Amravati",
            "Yashwantrao Chavan Maharashtra Open University, Nashik",
            "Kavayitri Bahinabai Chaudhari North Maharashtra University, Jalgaon",
            "Swami Ramanand Teerth Marathwada University, Nanded",
            "Kavi Kulguru Kalidas Sanskrit Vishwavidyalaya, Nagpur",
            "Punyashlok Ahilyadevi Holkar Solapur University, Solapur",
            "Gondwana University, Gadchiroli",
            "Dr. Babasaheb Ambedkar Technological University, Lonere",
            "Maharashtra National Law University, Mumbai",
            "Maharashtra National Law University, Aurangabad",
            "Maharashtra National Law University, Nagpur",
            "Institute of Chemical Technology (ICT), Mumbai",
            "Indian Institute of Technology Bombay, Mumbai",
            "Tilak Maharashtra Vidyapeeth, Pune",
            "Deccan College Post Graduate and Research Institute, Pune",
            "Gokhale Institute of Politics & Economics, Pune",
            "Bharati Vidyapeeth University, Pune",
            "MIT World Peace University, Pune",
            "Vishwakarma University, Pune",
            "Amity University, Raigad",
            "Spicer Adventist University, Pune",
            "FLAME University, Pune",
            "Ajeenkya DY Patil University, Pune",
            "Sandip University, Pune",
            "MIT ADT University, Pune",
            "Symbiosis Skills and Open University, Pune",
            "Sanjay Ghodhawat University, Kolhapur",
            "D. Y. Patil International University, Pune",
            "Sri Balaji University, Pune",
            "D Y Patil University, Pune",
            "Somaiya Vidiyavihar University, Mumbai",
            "Dr. Vishwanath Karad MIT World Peace University",
            "G. H. Raisoni University, Amravati",
            "Chhatrapati Shivaji Maharaj University, Raigad",
            "Vijaybhoomi University, Raigad",
            "MGM University, Aurangabad",
            "Ramdeobaba University, Nagpur",
            "Other"
        ]
        callback({
            "message" : universityList
        });
    
} 