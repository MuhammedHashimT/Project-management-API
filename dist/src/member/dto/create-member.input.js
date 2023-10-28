"use strict";
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
exports.CreateMemberInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const enums_1 = require("../../utils/enums");
let CreateMemberInput = class CreateMemberInput {
};
exports.CreateMemberInput = CreateMemberInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMemberInput.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMemberInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMemberInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateMemberInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMemberInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateMemberInput.prototype, "bio", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.Roles),
    __metadata("design:type", String)
], CreateMemberInput.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], CreateMemberInput.prototype, "skillsIds", void 0);
exports.CreateMemberInput = CreateMemberInput = __decorate([
    (0, graphql_1.InputType)()
], CreateMemberInput);
//# sourceMappingURL=create-member.input.js.map