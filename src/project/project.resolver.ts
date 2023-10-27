import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { HasRoles, RolesGuard } from 'src/member/roles/roles.guard';
import { Roles } from 'src/utils/enums';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  @HasRoles(Roles.ADMIN , Roles.MANAGER)
  @UseGuards(RolesGuard)
  createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project)
  @HasRoles(Roles.ADMIN , Roles.MANAGER)
  @UseGuards(RolesGuard)
  updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    return this.projectService.update(updateProjectInput.id, updateProjectInput);
  }

  @Mutation(() => Project)
  @HasRoles(Roles.ADMIN , Roles.MANAGER)
  @UseGuards(RolesGuard)
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.remove(id);
  }

  // addManagerToProject
  @Mutation(() => Project)
  addManagerToProject(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('managerId', { type: () => Int }) managerId: number,
  ) {
    return this.projectService.addManager(projectId, managerId);
  }
}
