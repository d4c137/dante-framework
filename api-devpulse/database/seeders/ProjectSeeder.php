<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
public function run(): void
{
    $projetos = [
        ['nome' => 'PEGAJOB', 'url_github' => 'https://github.com/d4c137/PegaJob', 'descricao' => 'Marketplace de freelancers com PWA.'],
        ['nome' => 'RP EDUCACIONAL', 'url_github' => 'https://github.com/d4c137/RP_Educacional', 'descricao' => 'Gestão escolar completa.'],
        ['nome' => 'BlackBox', 'url_github' => 'https://github.com/d4c137/Black-box', 'descricao' => 'Gerenciador com biometria.'],
        ['nome' => 'BarberFlow', 'url_github' => 'https://github.com/d4c137/barbearia', 'descricao' => 'Agendamento para barbearias.'],
        ['nome' => 'PowerFit Academia', 'url_github' => 'https://github.com/d4c137/landing-page-academia', 'descricao' => 'Landing page moderna.'],
        ['nome' => 'RP_Petshop', 'url_github' => 'https://github.com/d4c137/RP_Petshop', 'descricao' => 'Gestão de petshops.'],
        ['nome' => 'DANTE-FRAMEWORK', 'url_github' => 'https://github.com/d4c137/dante-framework', 'descricao' => 'Boilerplate PHP OOP.'],
    ];

    foreach ($projetos as $projeto) {
        \App\Models\Project::create($projeto);
    }
}
}
