const strong = ['Real Madrid', 'Manchester City', 'Liverpool', 'FC Bayern Munchen', 'FC Barcelona', 'Arsenal', 'Bayer 04 Leverkusen', 'Lombardia FC (Inter)', 'Paris Saint-Germain', 'Atletico Madrid', 'Chelsea', 'Manchester United', 'Tottenham Hotspur', 'Borussia Dortmund', 'Milano (AC Milan)']
const mid = ['Aston Villa', 'Newcastle United', 'RB Leipzig', 'Juventus', 'Roma', 'Athletic Club', 'West Ham United', 'Atalanta', 'Lazio', 'Napoli', 'Galatasaray SK', 'Fenerbahce SK', 'Girona FC', 'Crystal Palace', 'Brighton & Hove Albion', 'Fiorentina', 'Al Hilal', 'Real Sociedad', 'Sporting CP', 'PSV', 'Nottingham Forest', 'Olympique Lyonnnais', 'Wolverhampton Wanderers', 'Fulham FC', 'Olympique de Marseille', 'Sevilla FC', 'FC Porto', 'Everton', 'Al Nassr', 'Brentford', 'AFC Bournemouth', 'VFL Wolfsburg', 'Ajax', 'Southampton', 'Leicester City']
const weak = ['Leeds United', 'Inter Miami', 'Rangers FC', 'Ipswich Town', 'Burnley', 'Los Angeles FC', 'Shakhtar Donetsk', 'RCD Espanyol', 'Genoa', 'Racing Club', 'Luton Town', 'Viktoria Plzeň', 'FC Twente', 'LA Galaxy', 'Sheffield United', 'Norwich City', 'Middlesbrough', 'Sunderland', 'West Bromwich Albion', 'Cardiff City', 'FC Cincinnati', 'FC Lorient']
const women = []

let selectedType;

function matchTypeSelect() {
    const matchTypes = [
        [strong, 'Strong'],
        [mid, 'Mid'],
        [weak, 'Weak']
    ]
    return matchTypes[Math.floor(Math.random() * matchTypes.length)]
}

function teamSelect(teamsList) {
    let teams = [...teamsList] // Create a copy to avoid modifying the original array
    let team1 = teams[Math.floor(Math.random() * teams.length)]
    teams.splice(teams.indexOf(team1), 1)
    let team2 = teams[Math.floor(Math.random() * teams.length)]
    return [team1, team2]
}

function slotMachineEffect(callback) {
    const duration = 3000; // 3 seconds
    const interval = 50; // 50 milliseconds between updates
    const iterations = duration / interval;
    let count = 0;

    const updateDisplay = () => {
        let tempTeams = teamSelect(selectedType[0]);
        document.getElementById('p1team').innerHTML = `${document.getElementById('p1name').value} will play as: ${tempTeams[0]}`;
        document.getElementById('p2team').innerHTML = `${document.getElementById('p2name').value} will play as: ${tempTeams[1]}`;
        
        count++;
        if (count < iterations) {
            setTimeout(updateDisplay, interval);
        } else {
            callback();
        }
    };

    updateDisplay();
}

function generateTeam() {
    console.log("generateTeam function called");
    let player1 = document.getElementById('p1name').value;
    let player2 = document.getElementById('p2name').value;
    if (player1 == null || player1 == '' || player2 == null || player2 == '') {
        alert('Please fill in both player names!');
        return;
    }

    document.getElementById('btn1').disabled = true;

    let optionSelect = document.getElementById('optionDropdown').value;
    if (!selectedType || optionSelect !== selectedType[1]) {
        if (optionSelect !== 'Any') {
            selectedType = [eval(optionSelect.toLowerCase()), optionSelect];
        } else {
            selectedType = matchTypeSelect();
        }
    }

    document.getElementById('type').innerHTML = selectedType[1];

    slotMachineEffect(() => {
        let teams = teamSelect(selectedType[0]);
        document.getElementById('p1team').innerHTML = `${player1} will play as: ${teams[0]}`;
        document.getElementById('p2team').innerHTML = `${player2} will play as: ${teams[1]}`;
        
        document.getElementById('btn1').disabled = false;
    });
}
