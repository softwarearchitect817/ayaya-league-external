export const version = 12.14;

export const OFFSET = {
    oGameTime: 0x3109fac,

    oRenderer: 0x31437fc,
    oViewProjMatrix: 0x3140910,

    oAttackableList: 0x24C188C,

    oHeroManager: 0x1872A68,
    oMinionManager: 0x24c18b4,
    oTurretManager: 0x310792c,
    oMissileManager: 0x3111450, // 0x24c1860 <-- ?


    oUnderMouse: 0x24c1a24,

    oLocalPlayer: 0x31113EC,
    oObjectManager: 0x18729d8,


    oNetClient: 0x310BA6C, //Not sure
    oChatInstance: 0x31114A8,
    fPrintChat: 0x5E2150, // E8 ? ? ? ? 6A 00 68 ? ? ? ? E8 ? ? ? ? 83 C4 04
    

    oObjIndex: 0x0008,
    oObjTeam: 0x0034,

    oObjNetId: 0xB4,

    oObjPlayerName: 0x54,
    oObjName: 0x2BA4,
    oObjLevel: 0x3384,
    oObjPosition: 0x01DC,
    oObjAttackRange: 0x1394,
    oObjVisible: 0x0274,
    oObjHealth: 0x0E74,
    oObjMaxHealth: 0x0E84,
    oObjMana: 0x029C,
    oObjMaxMana: 0x02AC,
    oObjDead: 0x021C,
    oObjAD: 0x134C,
    oObjBonusAD: 0x12C4,


    oObjAiManager: 0x2C7C,
    oAiManagerStartPath: 0x1CC,
    oAiManagerEndPath: 0x1D8,
    oAiManagerIsMoving: 0x1C0,
    oAiManagerIsDashing: 0x214,
    oAiManagerCurrentSegment: 0x1C4,
    oAiManagerDashSpeed: 0x1F8,


    // --- MISSILES ---
    oMissileObjectEntry: 0x14,
    oMissileSpellInfo: 0x0260,
    oMissileSrcIdx: 0x2DC,
    oMissileDestIdx: 0x330,
    oMissileStartPos: 0x02DC,
    oMissileEndPos: 0x02E8,


    oBuffManager: 0x2178, //Not sure

    oSpellBook: 0x27B8,
    oSpellReadyAt: 0x24,
    oSpellLevel: 0x1C,
    oSpellDamage: 0x94,
    oSpellManaCost: 0x52C,
    oSpellInfo: 0x120,
    oSpellName: 0x18,

    oSpellInfoSlot: 0x4,
    oSpellInfoData: 0x40,
    oSpellInfoStartTime: 0x8,
    oSpellInfoIndex: 0xC,
    oSpellInfoLevel: 0x58,

    oSpellInfoDataMissileName: 0x78,
    oSpellInfoDataName: 0x6C,
    oSpellInfoDataCooldownTime: 0x0288,

    oMapCount: 44,
    oMapRoot: 40,
    oMapNodeObject: 20,
    oMapNetId: 16,

    oGameWindowWidth: 12,
    oGameWindowHeight: 16,

}


type Signatures = { [prop in keyof typeof OFFSET]: string }

export const SIGNATURE: Partial<Signatures> = {
    fPrintChat: 'E8 ? ? ? ? 6A 00 68 ? ? ? ? E8 ? ? ? ? 83 C4 04',
}

// namespace MissileData {
//     static constexpr int SpellInfo = 0x0260;
//     static constexpr int SrcIdx = 0x2DC;
//     static constexpr int DestIdx = 0x330;
//     static constexpr int StartPos = 0x02DC;
//     static constexpr int EndPos = 0x02E8;
// }

// int Offsets::MissileSpellInfo = 0x0260;
// int Offsets::MissileSrcIdx = 0x2DC;
// int Offsets::MissileDestIdx = 0x330;
// int Offsets::MissileStartPos = 0x02DC;
// int Offsets::MissileEndPos = 0x02E8;

// pub const LOCAL_PLAYER: u32 = 0x31113ec;
// pub const GAME_TIME: u32 = 0x3109fac;
// pub const OBJECT_MANAGER: u32 = 0x18729d8;
// pub const RENDERER: u32 = 0x31437fc;
// pub const UNDER_MOUSE_OBJECT: u32 = 0x24c1a24;
// pub const VIEW_PROJ_MATRICES: u32 = 0x3140910;

// pub const OBJECT_MAP_COUNT: u32 = 44;
// pub const OBJECT_MAP_ROOT: u32 = 40;
// pub const OBJECT_MAP_NODE_NET_ID: u32 = 16;
// pub const OBJECT_MAP_NODE_OBJECT: u32 = 20;

// pub const OBJECT_INDEX: u32 = 0x0008;
// pub const OBJECT_TEAM: u32 = 0x0034;
// pub const OBJECT_DIRECTION: u32 = 0x1F4;
// pub const OBJECT_POSITION: u32 = 0x01DC;
// pub const OBJECT_DEAD: u32 = 0x021C;
// pub const OBJECT_VISIBILITY: u32 = 0x0274;
// pub const OBJECT_MANA: u32 = 0x029C;
// pub const OBJECT_MAX_MANA: u32 = 0x02AC;
// pub const OBJECT_INVULNERABLE: u32 = 0x03D4;
// pub const OBJECT_TARGETABLE: u32 = 0x0D04;
// pub const OBJECT_HEALTH: u32 = 0x0E74;
// pub const OBJECT_MAX_HEALTH: u32 = 0x0E84;
// pub const OBJECT_BONUS_ATTACK_DAMAGE: u32 = 0x12C4;
// pub const OBJECT_ATTACK_DAMAGE: u32 = 0x134C;
// pub const OBJECT_ARMOR: u32 = 0x1374;
// pub const OBJECT_BONUS_ARMOR: u32 = 0x1374;
// pub const OBJECT_MAGIC_RESIST: u32 = 0x137C;
// pub const OBJECT_MOVEMENT_SPEED: u32 = 0x138C;
// pub const OBJECT_ATTACK_RANGE: u32 = 0x1394;
// pub const OBJECT_CHAMPION_NAME: u32 = 0x2BA4;
// pub const HERO_INTERFACE: u32 = 0x1872a68;
// pub const MINION_INTERFACE: u32 = 0x24c18b4;
// pub const TURRET_INTERFACE: u32 = 0x310792c;
// pub const MISSILE_INTERFACE: u32 = 0x24c1860;
// pub const GAME_WINDOW_WIDTH: u32 = 12;
// pub const GAME_WINDOW_HEIGHT: u32 = 16;
// pub const GAME_VERSION: u32 = 0x15130a4;

// pub const SPELL_BOOK: u32 = 0x27B8;
// pub const SPELL_READY_AT: u32 = 0x24;
// pub const SPELL_LEVEL: u32 = 0x1C;
// pub const SPELL_DAMAGE: u32 = 0x94;
// pub const SPELL_MANA_COST: u32 = 0x52C;
// pub const SPELL_INFO: u32 = 0x120;
// pub const SPELL_NAME: u32 = 0x18;

// pub const AI_MANAGER: i32 = 0x2C7C;
// pub const AI_MANAGER_START_PATH: u32 = 0x1CC;
// pub const AI_MANAGER_END_PATH: u32 = 0x1D8;