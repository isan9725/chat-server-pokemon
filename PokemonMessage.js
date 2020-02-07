

const getMessage = (askabout, pokejson) =>{
    let response = '';
    switch (askabout) {
        case 'abilities':
            response += `Las habilidades de ${pokejson.name} son ${pokejson.abilities.map(map => map.ability.name)}`;
            break;
        case 'weight':
            response += `El peso de ${pokejson.name} es de ${pokejson.weight} kilos`;
            break;
        case 'height':
            response += `La altura de ${pokejson.name} es de ${pokejson.height} metros.`;
            break;
        case 'stats':
            response += `los stats de ${pokejson.name} son ${pokejson.stats.map(map => map.stat.name)}`;
            break;
        case 'moves':
            response += `los movimientos de ${pokejson.name} son ${pokejson.moves.map(map => map.move.name)}`;
            break
        case 'types':
            response += `los tipos de ${pokejson.name} son ${pokejson.types.map(map => map.type.name)}`;
            break;
        default:
            response += 'No contengo la informacion que me pides';
            break;
    }
    return response;
}

module.exports = {getMessage};