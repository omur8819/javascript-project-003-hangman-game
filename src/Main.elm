module Main exposing (..)

import Browser
import Html exposing (Html, button, div, img, span, text)
import Html.Attributes exposing (class, classList, src)
import Html.Events exposing (onClick)
import Http
import Json.Decode exposing (Decoder, field, map2, string)
import Random exposing (generate)
import Set exposing (Set)



---- MODEL ----


type Model
    = Loading
    | Running GameState
    | Error


type alias GameState =
    { character : Character
    , guesses : Set String
    }


init : ( Model, Cmd Msg )
init =
    ( Loading
    , generateId
    )


alphabet : String
alphabet =
    "abcdefghijklmnopqrstuvwxyz-"


baseUrl : String
baseUrl =
    "https://rickandmortyapi.com/api/character/"



---- UPDATE ----


type alias Character =
    { name : String
    , image : String
    }


type Msg
    = NewGame
    | Restart
    | GetCharacter Int
    | NewCharacter (Result Http.Error Character)
    | Guess String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewGame ->
            ( Loading, generateId )

        GetCharacter characterId ->
            ( model
            , getCharacter <| baseUrl ++ String.fromInt characterId
            )

        Restart ->
            case model of
                Running gameState ->
                    ( Running { gameState | guesses = Set.empty }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        NewCharacter result ->
            case result of
                Ok character ->
                    ( Running { character = character, guesses = Set.empty }, Cmd.none )

                Err _ ->
                    ( Error, Cmd.none )

        Guess char ->
            case model of
                Running gameState ->
                    ( Running { gameState | guesses = Set.insert char gameState.guesses }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )


generateId : Cmd Msg
generateId =
    generate GetCharacter <| Random.int 1 591


getCharacter : String -> Cmd Msg
getCharacter characterUrl =
    Http.get
        { url = characterUrl
        , expect = Http.expectJson NewCharacter characterDecoder
        }


characterDecoder : Decoder Character
characterDecoder =
    map2 Character
        (field "name" string)
        (field "image" string)



---- VIEW ----


view : Model -> Html Msg
view model =
    case model of
        Loading ->
            div [] [ text "Loading" ]

        Running gameState ->
            viewGameState gameState

        Error ->
            div [] [ text "Error" ]


keyboard : Html Msg
keyboard =
    alphabet
        |> String.split ""
        |> List.map
            (\char ->
                button [ onClick <| Guess char ] [ text char ]
            )
        |> div []


viewGameState : GameState -> Html Msg
viewGameState { character, guesses } =
    let
        characterName =
            character.name
                |> String.toLower
                |> String.split ""
                |> List.map
                    (\char ->
                        if char == " " then
                            " "

                        else if Set.member char guesses then
                            char

                        else
                            "_"
                    )
                |> List.map
                    (\char ->
                        span [] [ text char ]
                    )
                |> div []

        characterNameSet =
            character.name
                |> String.split ""
                |> Set.fromList

        failures =
            guesses
                |> Set.toList
                |> List.filter (\char -> not <| Set.member char characterNameSet)
                |> List.map (\char -> span [] [ text char ])
                |> div [ class "failures-wrapper" ]

        hangmanImage =
            img
                [ src <| "%PUBLIC_URL%/" ++ "hangman-" ++ String.fromInt (Set.size guesses) ++ ".png"
                , class "hangman-image"
                , classList [ ( "is-hide", Set.size guesses < 1 ) ]
                ]
                []
    in
    div [ class "game-wrapper" ]
        [ characterName
        , keyboard
        , failures
        , img [ src character.image ] []
        , hangmanImage
        , div []
            [ button [ onClick Restart ] [ text "Restart" ]
            , button [ onClick NewGame ] [ text "New game" ]
            ]
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = always Sub.none
        }
