"use strict";
// src/models/RolePermissionsMap.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionsMap = void 0;
const typeorm_1 = require("typeorm");
const Role_1 = require("./Role");
const Permission_1 = require("./Permission");
let RolePermissionsMap = class RolePermissionsMap {
};
exports.RolePermissionsMap = RolePermissionsMap;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RolePermissionsMap.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role, (role) => role.permissions),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", Role_1.Role)
], RolePermissionsMap.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Permission_1.Permission, (permission) => permission.rolePermissions),
    (0, typeorm_1.JoinColumn)({ name: 'permission_id' }),
    __metadata("design:type", Permission_1.Permission)
], RolePermissionsMap.prototype, "permission", void 0);
exports.RolePermissionsMap = RolePermissionsMap = __decorate([
    (0, typeorm_1.Entity)()
], RolePermissionsMap);
